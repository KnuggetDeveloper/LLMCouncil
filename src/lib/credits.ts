import { prisma } from "./prisma";
import { v4 as uuidv4 } from "uuid";

// Constants
export const CREDITS_PER_USD = 1500;
export const SIGNUP_GRANT_CREDITS = 1500;
export const MONTHLY_GRANT_CREDITS = 20000;
export const CAP_CREDITS = 40000;

// Convert to microcredits
export const SIGNUP_GRANT_MICRO = BigInt(SIGNUP_GRANT_CREDITS * 1_000_000);
export const MONTHLY_GRANT_MICRO = BigInt(MONTHLY_GRANT_CREDITS * 1_000_000);
export const CAP_MICRO = BigInt(CAP_CREDITS * 1_000_000);

/**
 * Convert microcredits to display credits (floor)
 */
export function microToDisplayCredits(microcredits: bigint): number {
  return Number(microcredits / BigInt(1_000_000));
}

/**
 * Convert USD decimal to microusd integer
 */
export function usdToMicrousd(usdDecimal: number): bigint {
  return BigInt(Math.round(usdDecimal * 1_000_000));
}

/**
 * Get user's wallet balance
 */
export async function getUserWallet(userId: string) {
  return await prisma.userWallet.findUnique({
    where: { userId },
  });
}

/**
 * Check if user has sufficient credits
 */
export async function checkSufficientCredits(
  userId: string,
  costMicrousd: bigint
): Promise<{ sufficient: boolean; balance: bigint; required: bigint }> {
  const wallet = await getUserWallet(userId);
  
  if (!wallet) {
    return { sufficient: false, balance: BigInt(0), required: BigInt(0) };
  }

  const requiredMicrocredits = costMicrousd * BigInt(CREDITS_PER_USD);
  
  return {
    sufficient: wallet.balanceMicrocredits >= requiredMicrocredits,
    balance: wallet.balanceMicrocredits,
    required: requiredMicrocredits,
  };
}

/**
 * Deduct credits for AI usage (idempotent)
 * Returns the usage record if successful, null if insufficient credits
 */
export async function deductCredits(params: {
  userId: string;
  requestId: string;
  openrouterGenerationId?: string;
  modelUsed?: string;
  activityType: string;
  costMicrousd: bigint;
  tokenUsage?: Record<string, unknown>;
}): Promise<{ success: boolean; balance?: number; error?: string }> {
  const {
    userId,
    requestId,
    openrouterGenerationId,
    modelUsed,
    activityType,
    costMicrousd,
    tokenUsage,
  } = params;

  try {
    // Use transaction for atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Check if already processed (idempotency)
      const existing = await tx.creditUsage.findUnique({
        where: { requestId },
      });

      if (existing) {
        // Already processed, return cached result
        return {
          success: true,
          balance: microToDisplayCredits(existing.balanceAfterMicrocredits),
        };
      }

      // Lock wallet row
      const wallet = await tx.userWallet.findUnique({
        where: { userId },
      });

      if (!wallet) {
        return { success: false, error: "Wallet not found" };
      }

      const debitMicrocredits = costMicrousd * BigInt(CREDITS_PER_USD);

      // Check sufficient balance
      if (wallet.balanceMicrocredits < debitMicrocredits) {
        return {
          success: false,
          error: "Insufficient credits",
          balance: microToDisplayCredits(wallet.balanceMicrocredits),
        };
      }

      const balanceBefore = wallet.balanceMicrocredits;
      const balanceAfter = balanceBefore - debitMicrocredits;

      // Update wallet
      await tx.userWallet.update({
        where: { userId },
        data: { balanceMicrocredits: balanceAfter },
      });

      // Record usage
      await tx.creditUsage.create({
        data: {
          id: uuidv4(),
          userId,
          requestId,
          openrouterGenerationId,
          modelUsed,
          activityType,
          costMicrousd,
          debitMicrocredits,
          tokenUsage: tokenUsage as never,
          balanceBeforeMicrocredits: balanceBefore,
          balanceAfterMicrocredits: balanceAfter,
        },
      });

      return {
        success: true,
        balance: microToDisplayCredits(balanceAfter),
      };
    });

    return result;
  } catch (error) {
    console.error("Error deducting credits:", error);
    return { success: false, error: "Transaction failed" };
  }
}

/**
 * Add subscription credits (idempotent, with cap)
 */
export async function addSubscriptionCredits(params: {
  userId: string;
  paymentProvider: string;
  paymentProviderId: string;
  amountPaidCents: number;
  currency?: string;
}): Promise<{ success: boolean; newBalance?: number; error?: string }> {
  const {
    userId,
    paymentProvider,
    paymentProviderId,
    amountPaidCents,
    currency = "USD",
  } = params;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Check if payment already processed (idempotency)
      const existing = await tx.subscriptionPayment.findUnique({
        where: { paymentProviderId },
      });

      if (existing) {
        return {
          success: true,
          newBalance: microToDisplayCredits(existing.balanceAfterMicrocredits),
        };
      }

      // Lock wallet
      const wallet = await tx.userWallet.findUnique({
        where: { userId },
      });

      if (!wallet) {
        return { success: false, error: "Wallet not found" };
      }

      const balanceBefore = wallet.balanceMicrocredits;
      const grant = MONTHLY_GRANT_MICRO;
      const cap = wallet.capMicrocredits;

      // Apply cap: min(balance + grant, cap)
      const potentialTotal = balanceBefore + grant;
      const balanceAfter = potentialTotal > cap ? cap : potentialTotal;

      // Update wallet
      await tx.userWallet.update({
        where: { userId },
        data: {
          balanceMicrocredits: balanceAfter,
          subscriptionStatus: "active",
        },
      });

      // Record payment
      await tx.subscriptionPayment.create({
        data: {
          id: uuidv4(),
          userId,
          paymentProvider,
          paymentProviderId,
          amountPaidCents,
          currency,
          grantMicrocredits: grant,
          balanceBeforeMicrocredits: balanceBefore,
          balanceAfterMicrocredits: balanceAfter,
        },
      });

      return {
        success: true,
        newBalance: microToDisplayCredits(balanceAfter),
      };
    });

    return result;
  } catch (error) {
    console.error("Error adding subscription credits:", error);
    return { success: false, error: "Transaction failed" };
  }
}

