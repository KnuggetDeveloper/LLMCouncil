import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import DodoPayments from "dodopayments";

// POST /api/subscription/checkout - Create Dodo checkout session
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Initialize Dodo Payments client
    const client = new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    });

    // Get product ID from environment variable
    const productId = process.env.DODO_PRODUCT_ID;
    
    if (!productId) {
      return NextResponse.json(
        { error: "Subscription product not configured" },
        { status: 500 }
      );
    }

    // Get return URL from request or use default
    const { returnUrl } = await request.json().catch(() => ({}));
    const finalReturnUrl = returnUrl || `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard`;

    // Create checkout session
    const checkoutSession = await client.checkoutSessions.create({
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      customer: {
        email: user.email || "",
        name: user.name || undefined,
      },
      return_url: finalReturnUrl,
      metadata: {
        user_id: user.uid,
        type: "subscription",
      },
      billing_currency: "USD",
      allowed_payment_method_types: ["credit", "debit"],
      show_saved_payment_methods: true,
    });

    return NextResponse.json({
      sessionId: checkoutSession.session_id,
      checkoutUrl: checkoutSession.checkout_url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

