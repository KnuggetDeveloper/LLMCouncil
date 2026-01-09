# Subscription & Credits System Setup Guide

This guide will help you set up the subscription and credits system for LLM Council using Dodo Payments.

## Overview

The system implements a credits-based subscription model where:

- New users get 1,500 credits on signup
- $1 = 1,500 credits conversion rate
- Pro subscription costs $20/month and grants 20,000 credits
- Unused credits roll over for up to 2 months (40,000 credit cap)
- Credits are deducted based on actual OpenRouter API costs

## Prerequisites

1. **PostgreSQL Database** - Already configured in your project
2. **Dodo Payments Account** - Sign up at [dodopayments.com](https://dodopayments.com)
3. **OpenRouter API Key** - For accessing LLM models
4. **Dodo Payments Next.js Adapter** - Already installed (`@dodopayments/nextjs`)

## Step 1: Database Migration

Run the Prisma migration to create the necessary tables:

```bash
npx prisma migrate dev --name add_credits_system
```

This creates three new tables:

- `user_wallet` - Stores user credit balances and subscription status
- `subscription_payments` - Ledger of all subscription payments (money-in)
- `credit_usage` - Ledger of all API usage and credit deductions (money-out)

Then generate the Prisma client:

```bash
npx prisma generate
```

## Step 2: Create Dodo Payments Product

1. Log in to your Dodo Payments dashboard
2. Navigate to **Products** → **Create Product**
3. Create a subscription product with these settings:
   - **Name**: "LLM Council Pro"
   - **Type**: Subscription
   - **Price**: $20.00 USD
   - **Billing Period**: Monthly
   - **Description**: "20,000 credits per month with 2-month rollover"
4. Copy the **Product ID** (e.g., `prod_xxxxxxxxxxxxx`)

## Step 3: Environment Variables

Add the following environment variables to your `.env` file:

```env
# Dodo Payments Configuration (using @dodopayments/nextjs adapter)
DODO_PAYMENTS_API_KEY=your_dodo_api_key_here
DODO_PAYMENTS_WEBHOOK_KEY=your_webhook_secret_here
DODO_PAYMENTS_ENVIRONMENT=test_mode  # or "live_mode" for production
DODO_PAYMENTS_RETURN_URL=http://localhost:3000/subscription/success
DODO_PRODUCT_ID=your_product_id_here

# Site URL (for redirects)
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Change to your production URL

# Existing variables (keep these)
DATABASE_URL=your_database_url
FIREBASE_ADMIN_PROJECT_ID=your_firebase_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_ADMIN_PRIVATE_KEY=your_firebase_private_key
```

### Where to Find Dodo Payments Credentials:

1. **API Key (`DODO_PAYMENTS_API_KEY`)**: Dashboard → Settings → API Keys → Create API Key
2. **Product ID (`DODO_PRODUCT_ID`)**: Dashboard → Products → Select your product → Copy ID
3. **Webhook Secret (`DODO_PAYMENTS_WEBHOOK_KEY`)**: Dashboard → Webhooks → Create Webhook → Copy Secret
4. **Environment (`DODO_PAYMENTS_ENVIRONMENT`)**: Use `test_mode` for testing, `live_mode` for production

> **Note**: This project uses the official `@dodopayments/nextjs` adapter which provides built-in route handlers with automatic signature verification and event routing.

## Step 4: Configure Dodo Payments Webhook

This project uses the official `@dodopayments/nextjs` adapter for webhook handling, which automatically:

- Verifies webhook signatures
- Validates payloads
- Routes events to appropriate handlers

**Setup Steps:**

1. In Dodo Payments dashboard, go to **Webhooks**
2. Click **Create Webhook**
3. Set the webhook URL to: `https://yourdomain.com/api/subscription/webhook`
   - For local testing: Use ngrok or similar tool to expose your local server
4. Select these events to listen for:
   - `payment.succeeded`
   - `subscription.active`
   - `subscription.renewed`
   - `subscription.cancelled`
   - `subscription.expired`
   - `subscription.failed`
5. Copy the **Webhook Secret** and add it to your `.env` file as `DODO_PAYMENTS_WEBHOOK_KEY`

The webhook handler (`src/app/api/subscription/webhook/route.ts`) uses the adapter's `Webhooks` function with event-specific handlers:

- `onPaymentSucceeded` - Grants credits on successful payment
- `onSubscriptionActive` - Grants credits when subscription activates
- `onSubscriptionRenewed` - Grants credits on renewal (respects cap)
- `onSubscriptionCancelled` - Updates subscription status
- `onSubscriptionExpired` - Updates subscription status
- `onSubscriptionFailed` - Marks subscription as past_due

## Step 5: Test the Integration

### Local Testing with ngrok:

```bash
# Install ngrok if you haven't
npm install -g ngrok

# Start your Next.js app
npm run dev

# In another terminal, expose your local server
ngrok http 3000

# Use the ngrok URL for webhook configuration
```

### Test Flow:

1. **Sign up a new user**

   - User should automatically receive 1,500 credits
   - Check database: `SELECT * FROM user_wallet WHERE user_id = 'user_id';`

2. **Make an API request**

   - Credits should be deducted based on OpenRouter cost
   - Check database: `SELECT * FROM credit_usage WHERE user_id = 'user_id';`

3. **Test subscription purchase**
   - Navigate to `/subscription`
   - Click "Subscribe Now"
   - Complete payment in Dodo Payments checkout
   - Verify webhook received and credits added
   - Check database: `SELECT * FROM subscription_payments WHERE user_id = 'user_id';`

## Step 6: Verify Credit Calculations

The system uses **microcredits** (1 credit = 1,000,000 microcredits) for precise calculations:

```typescript
// Example: OpenRouter returns cost of $0.01433
const costUsd = 0.01433;
const costMicrousd = Math.round(costUsd * 1_000_000); // 14,330 microusd
const debitMicrocredits = costMicrousd * 1500; // 21,495,000 microcredits
const debitCredits = Math.floor(debitMicrocredits / 1_000_000); // 21 credits
```

## API Endpoints

### GET /api/credits

Get user's current credit balance and subscription status.

**Headers:**

```
Authorization: Bearer <firebase_id_token>
```

**Response:**

```json
{
  "credits": 1500,
  "subscriptionStatus": "free",
  "currentPeriodEnd": null
}
```

### POST /api/subscription/checkout

Create a Dodo Payments checkout session.

**Headers:**

```
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

**Body:**

```json
{
  "returnUrl": "https://yourdomain.com/subscription/success"
}
```

**Response:**

```json
{
  "sessionId": "session_xxxxx",
  "checkoutUrl": "https://checkout.dodopayments.com/xxxxx"
}
```

### POST /api/subscription/webhook

Webhook endpoint for Dodo Payments events (called by Dodo, not your frontend).

## UI Components

### CreditsDisplay Component

Add to your main layout to show current credit balance:

```tsx
import CreditsDisplay from "@/components/CreditsDisplay";

// In your layout or header
<CreditsDisplay />;
```

### Subscription Page

Users can view plans and subscribe at: `/subscription`

### Success Page

After successful payment, users are redirected to: `/subscription/success`

## Database Schema

### user_wallet

- `user_id` (PK) - Firebase UID
- `balance_microcredits` - Current balance in microcredits
- `subscription_status` - "free", "active", "cancelled"
- `current_period_end` - Subscription period end date
- `cap_microcredits` - Maximum balance (40,000 credits = 40B microcredits)

### subscription_payments

- `id` (PK)
- `user_id` (FK)
- `payment_provider_id` (UNIQUE) - Dodo payment ID for idempotency
- `amount_paid_cents` - Amount paid in cents
- `grant_microcredits` - Credits granted
- `balance_before_microcredits` - Balance before grant
- `balance_after_microcredits` - Balance after grant (with cap applied)

### credit_usage

- `id` (PK)
- `user_id` (FK)
- `request_id` (UNIQUE) - For idempotency
- `openrouter_generation_id` - OpenRouter generation ID
- `model_used` - Model identifier
- `activity_type` - "chat", "critique", "debate", etc.
- `cost_microusd` - Cost in microusd
- `debit_microcredits` - Credits deducted
- `token_usage` - JSON with token counts

## Monitoring & Analytics

### Check User Balance

```sql
SELECT
  user_id,
  balance_microcredits / 1000000 as credits,
  subscription_status
FROM user_wallet
WHERE user_id = 'user_firebase_uid';
```

### View Recent Usage

```sql
SELECT
  created_at,
  model_used,
  cost_microusd / 1000000 as cost_usd,
  debit_microcredits / 1000000 as credits_deducted,
  balance_after_microcredits / 1000000 as balance_after
FROM credit_usage
WHERE user_id = 'user_firebase_uid'
ORDER BY created_at DESC
LIMIT 10;
```

### View Subscription Payments

```sql
SELECT
  created_at,
  amount_paid_cents / 100 as amount_usd,
  grant_microcredits / 1000000 as credits_granted,
  balance_after_microcredits / 1000000 as balance_after
FROM subscription_payments
WHERE user_id = 'user_firebase_uid'
ORDER BY created_at DESC;
```

## Troubleshooting

### Credits Not Deducted After API Call

1. Check if OpenRouter returned a generation ID in response headers
2. Verify the stats API call is working: `GET https://openrouter.ai/api/v1/generation?id={generation_id}`
3. Check server logs for credit deduction errors
4. Verify `credit_usage` table for the request_id

### Webhook Not Receiving Events

1. Verify webhook URL is publicly accessible
2. Check Dodo Payments webhook logs in dashboard
3. Verify `DODO_PAYMENTS_WEBHOOK_KEY` matches the secret from Dodo dashboard
4. Check server logs at `/api/subscription/webhook`
5. Verify the adapter is correctly installed: `npm list @dodopayments/nextjs`
6. Test webhook signature verification is working (adapter handles this automatically)

### Credits Not Added After Payment

1. Check if webhook was received (server logs)
2. Verify payment_provider_id in `subscription_payments` table
3. Check for duplicate payment attempts (idempotency)
4. Verify user_id in webhook metadata matches Firebase UID

### Cap Not Applied Correctly

The cap is applied when adding subscription credits:

```typescript
const balanceAfter = Math.min(balanceBefore + grant, cap);
```

If balance exceeds cap, check the `addSubscriptionCredits` function logic.

## Security Considerations

1. **Webhook Signature Verification**: ✅ Automatically handled by `@dodopayments/nextjs` adapter
2. **Rate Limiting**: Add rate limiting to API endpoints
3. **API Key Storage**: Never expose Dodo API keys in frontend code
4. **User Authentication**: All credit operations require Firebase authentication
5. **Idempotency**: All payment and usage operations are idempotent to prevent double-charging
6. **Environment Variables**: All sensitive keys are stored in environment variables, never in code

### Benefits of Using the Official Adapter

The `@dodopayments/nextjs` adapter provides several advantages:

- ✅ **Automatic Signature Verification**: No need to implement custom webhook verification
- ✅ **Type-Safe Payloads**: Built-in TypeScript types for all webhook events
- ✅ **Event Routing**: Clean event handlers instead of switch statements
- ✅ **Error Handling**: Automatic 401/400/500 responses for invalid requests
- ✅ **Payload Validation**: Zod-based validation ensures data integrity
- ✅ **Production Ready**: Battle-tested implementation used by Dodo Payments customers

## Production Checklist

- [ ] Database migration completed
- [ ] Environment variables configured
- [ ] Dodo Payments product created
- [ ] Webhook configured and tested
- [ ] SSL certificate installed (required for webhooks)
- [ ] Webhook signature verification implemented
- [ ] Error monitoring set up (e.g., Sentry)
- [ ] Database backups configured
- [ ] Rate limiting implemented
- [ ] Terms of service and privacy policy updated
- [ ] Payment flow tested end-to-end
- [ ] Credit deduction tested with various models
- [ ] Rollover logic tested (cap enforcement)

## Support

For issues related to:

- **Dodo Payments**: Contact support@dodopayments.com
- **OpenRouter**: Check docs at openrouter.ai/docs
- **This Implementation**: Check server logs and database state

## Credits Conversion Examples

| OpenRouter Cost | Microusd  | Credits Deducted |
| --------------- | --------- | ---------------- |
| $0.001          | 1,000     | 1.5 → 1          |
| $0.01           | 10,000    | 15               |
| $0.01433        | 14,330    | 21.495 → 21      |
| $0.10           | 100,000   | 150              |
| $1.00           | 1,000,000 | 1,500            |

Note: Credits are always rounded down (floor) when displaying to users.
