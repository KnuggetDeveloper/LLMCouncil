import { Webhooks } from "@dodopayments/nextjs";
import { addSubscriptionCredits } from "@/lib/credits";
import { prisma } from "@/lib/prisma";

// POST /api/subscription/webhook - Handle Dodo Payments webhook using official adapter
export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,

  // Handle successful payments
  onPaymentSucceeded: async (payload) => {
    console.log("Payment succeeded:", payload.type);

    const userId = payload.data.metadata?.user_id;
    const paymentId = payload.data.payment_id;
    const amount = 2000; // Default to $20 (2000 cents)

    if (!userId || !paymentId) {
      console.error("Missing user_id or payment_id in webhook payload");
      return;
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.error("User not found:", userId);
      return;
    }

    // Add subscription credits
    const result = await addSubscriptionCredits({
      userId,
      paymentProvider: "dodo",
      paymentProviderId: paymentId,
      amountPaidCents: amount,
      currency: "USD",
    });

    if (!result.success) {
      console.error("Failed to add credits:", result.error);
    } else {
      console.log(
        `Successfully added credits for user ${userId}. New balance: ${result.newBalance}`
      );
    }
  },

  // Handle subscription activation
  onSubscriptionActive: async (payload) => {
    console.log("Subscription activated:", payload.type);

    const userId = payload.data.metadata?.user_id;
    const subscriptionId = payload.data.subscription_id;
    const amount = 2000; // $20 in cents

    if (!userId || !subscriptionId) {
      console.error("Missing user_id or subscription_id in webhook payload");
      return;
    }

    // Add subscription credits
    const result = await addSubscriptionCredits({
      userId,
      paymentProvider: "dodo",
      paymentProviderId: subscriptionId,
      amountPaidCents: amount,
      currency: "USD",
    });

    if (result.success) {
      console.log(
        `Subscription activated for user ${userId}. New balance: ${result.newBalance}`
      );
    }
  },

  // Handle subscription renewal
  onSubscriptionRenewed: async (payload) => {
    console.log("Subscription renewed:", payload.type);

    const userId = payload.data.metadata?.user_id;
    const paymentId = payload.data.subscription_id;
    const amount = 2000; // $20 in cents

    if (!userId || !paymentId) {
      console.error("Missing user_id or payment_id in webhook payload");
      return;
    }

    // Add subscription credits
    const result = await addSubscriptionCredits({
      userId,
      paymentProvider: "dodo",
      paymentProviderId: `${paymentId}_renewal_${Date.now()}`, // Make unique for each renewal
      amountPaidCents: amount,
      currency: "USD",
    });

    if (result.success) {
      console.log(
        `Subscription renewed for user ${userId}. New balance: ${result.newBalance}`
      );
    }
  },

  // Handle subscription cancellation
  onSubscriptionCancelled: async (payload) => {
    console.log("Subscription cancelled:", payload.type);

    const userId = payload.data.metadata?.user_id;

    if (!userId) {
      console.error("Missing user_id in webhook payload");
      return;
    }

    // Update subscription status
    await prisma.userWallet.update({
      where: { userId },
      data: {
        subscriptionStatus: "cancelled",
      },
    });

    console.log(`Subscription cancelled for user ${userId}`);
  },

  // Handle subscription expiration
  onSubscriptionExpired: async (payload) => {
    console.log("Subscription expired:", payload.type);

    const userId = payload.data.metadata?.user_id;

    if (!userId) {
      console.error("Missing user_id in webhook payload");
      return;
    }

    // Update subscription status
    await prisma.userWallet.update({
      where: { userId },
      data: {
        subscriptionStatus: "expired",
      },
    });

    console.log(`Subscription expired for user ${userId}`);
  },

  // Handle subscription failure
  onSubscriptionFailed: async (payload) => {
    console.log("Subscription payment failed:", payload.type);

    const userId = payload.data.metadata?.user_id;

    if (!userId) {
      console.error("Missing user_id in webhook payload");
      return;
    }

    // Update subscription status
    await prisma.userWallet.update({
      where: { userId },
      data: {
        subscriptionStatus: "past_due",
      },
    });

    console.log(`Subscription payment failed for user ${userId}`);
  },

  // Catch-all handler for any webhook event
  onPayload: async (payload) => {
    console.log("Received webhook event:", payload.type);
  },
});
