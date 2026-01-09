# Subscription & Credits System - Implementation Summary

## ✅ What Has Been Implemented

I've successfully implemented a complete subscription and credits system for your LLM Council application. Here's what's been added:

### 1. Database Schema (Prisma)

**Three new tables:**
- `user_wallet` - Stores user credit balances and subscription status
- `subscription_payments` - Ledger of all subscription payments (money-in)
- `credit_usage` - Ledger of all API usage and credit deductions (money-out)

**Key features:**
- Uses microcredits (1 credit = 1,000,000 microcredits) for precise calculations
- Idempotent operations to prevent double-charging
- Automatic rollover with 40,000 credit cap
- Complete audit trail of all transactions

### 2. Credits Management Library (`src/lib/credits.ts`)

**Functions:**
- `getUserWallet(userId)` - Get user's wallet
- `checkSufficientCredits(userId, costMicrousd)` - Check if user has enough credits
- `deductCredits(...)` - Deduct credits after API usage (idempotent)
- `addSubscriptionCredits(...)` - Add credits on subscription payment (idempotent, with cap)
- Helper functions for unit conversions

**Key features:**
- Atomic database transactions
- Idempotency using request_id and payment_provider_id
- Automatic cap enforcement (40,000 credits max)
- Precise credit calculations using microcredits

### 3. Authentication Integration

**Updated:** `src/app/api/auth/sync/route.ts`
- Automatically creates wallet with 1,500 credits when new user signs up
- No changes required to signup flow

### 4. Subscription Checkout API

**Created:** `src/app/api/subscription/checkout/route.ts`
- Creates Dodo Payments checkout sessions
- Passes Firebase user_id in metadata for webhook identification
- Returns checkout URL for redirecting users
- Integrates with Firebase authentication

### 5. Webhook Handler (Using Official Adapter)

**Created:** `src/app/api/subscription/webhook/route.ts`
- Uses `@dodopayments/nextjs` official adapter
- Automatic signature verification
- Event-specific handlers:
  - `onPaymentSucceeded` - Grants credits on successful payment
  - `onSubscriptionActive` - Grants credits when subscription activates
  - `onSubscriptionRenewed` - Grants credits on renewal
  - `onSubscriptionCancelled` - Updates status
  - `onSubscriptionExpired` - Updates status
  - `onSubscriptionFailed` - Marks as past_due

**Key features:**
- Built-in security and validation
- Type-safe webhook payloads
- Clean event routing
- Automatic error responses

### 6. Credits Balance API

**Created:** `src/app/api/credits/route.ts`
- Returns current credit balance
- Shows subscription status
- Requires Firebase authentication

### 7. Chat API with Cost Tracking

**Updated:** `src/app/api/chat/route.ts`
- Tracks OpenRouter API costs
- Queries OpenRouter stats API for actual usage
- Deducts credits based on $1 = 1,500 credits conversion
- Stores usage metadata (tokens, model, etc.)
- Idempotent deduction using unique request_id

**Flow:**
1. User makes API request
2. OpenRouter processes request
3. System queries OpenRouter stats API for cost
4. Credits automatically deducted based on actual cost
5. Usage recorded in database

### 8. UI Components

**Created:**
- `src/components/CreditsDisplay.tsx` - Shows credit balance in header
- `src/app/subscription/page.tsx` - Subscription plans page
- `src/app/subscription/success/page.tsx` - Post-payment success page

**Features:**
- Real-time credit balance display
- Low credits warning
- Upgrade button for free users
- Beautiful pricing page with plan comparison

### 9. Documentation

**Created:**
- `SUBSCRIPTION_SETUP.md` - Complete setup guide
- `ENV_SETUP.md` - Environment variables reference
- `IMPLEMENTATION_SUMMARY.md` - This file

## 📦 Packages Installed

```json
{
  "dodopayments": "^1.x.x",
  "@dodopayments/nextjs": "^1.x.x"
}
```

## 🔧 Required Environment Variables

```env
# Dodo Payments
DODO_PAYMENTS_API_KEY=your_api_key
DODO_PAYMENTS_WEBHOOK_KEY=your_webhook_secret
DODO_PAYMENTS_ENVIRONMENT=test_mode
DODO_PAYMENTS_RETURN_URL=http://localhost:3000/subscription/success
DODO_PRODUCT_ID=your_product_id

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Existing (Firebase, Database)
DATABASE_URL=your_database_url
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_email
FIREBASE_ADMIN_PRIVATE_KEY=your_key
```

## 🚀 Next Steps to Go Live

### 1. Create Dodo Payments Product
1. Sign up at [dodopayments.com](https://dodopayments.com)
2. Create a subscription product:
   - Name: "LLM Council Pro"
   - Price: $20/month
   - Copy the Product ID

### 2. Set Up Environment Variables
1. Add all required variables to your `.env` file
2. See `ENV_SETUP.md` for detailed instructions

### 3. Run Database Migration
```bash
npx prisma migrate dev --name add_credits_system
npx prisma generate
```

### 4. Configure Webhook
1. In Dodo dashboard, create webhook pointing to:
   - URL: `https://yourdomain.com/api/subscription/webhook`
2. Select events:
   - `payment.succeeded`
   - `subscription.active`
   - `subscription.renewed`
   - `subscription.cancelled`
   - `subscription.expired`
   - `subscription.failed`
3. Copy webhook secret to `DODO_PAYMENTS_WEBHOOK_KEY`

### 5. Test the Flow

**New User Signup:**
```bash
# User signs up with Google
# → Automatically gets 1,500 credits
# → Can start using the app immediately
```

**Make API Requests:**
```bash
# User makes chat request
# → OpenRouter processes request
# → Cost calculated (e.g., $0.01433 = 21 credits)
# → Credits deducted automatically
# → New balance shown in UI
```

**Subscribe:**
```bash
# User navigates to /subscription
# → Clicks "Subscribe Now"
# → Redirected to Dodo checkout
# → Completes payment
# → Webhook adds 20,000 credits
# → Respects 40,000 cap if they had unused credits
```

### 6. Add Credits Display to Layout

Add the `CreditsDisplay` component to your main layout:

```tsx
import CreditsDisplay from "@/components/CreditsDisplay";

// In your layout or header
<header>
  {/* Other header content */}
  <CreditsDisplay />
</header>
```

## 💳 How Credits Work

### Conversion Rate
- **$1 USD = 1,500 credits**
- Uses microcredits internally for precision
- Credits always rounded down for display

### Example Calculations

| OpenRouter Cost | Calculation | Credits Deducted |
|----------------|-------------|------------------|
| $0.001 | $0.001 × 1,500 | 1.5 → 1 credit |
| $0.01 | $0.01 × 1,500 | 15 credits |
| $0.01433 | $0.01433 × 1,500 | 21.495 → 21 credits |
| $0.10 | $0.10 × 1,500 | 150 credits |
| $1.00 | $1.00 × 1,500 | 1,500 credits |

### Subscription Credits
- New users: 1,500 credits (free)
- Pro subscription: 20,000 credits/month
- Rollover: Unused credits carry forward up to 40,000 cap
- Cap enforcement: If balance + grant > 40,000, balance set to 40,000

### Rollover Example
```
Starting balance: 15,000 credits
Subscription payment: +20,000 credits
Total: 35,000 credits ✓ (under cap)

Starting balance: 25,000 credits
Subscription payment: +20,000 credits
Total: 45,000 → capped at 40,000 credits
```

## 🔒 Security Features

✅ **Webhook Signature Verification** - Automatic via adapter
✅ **Idempotent Operations** - Prevents double-charging
✅ **Atomic Transactions** - Database consistency guaranteed
✅ **Firebase Authentication** - All operations require auth
✅ **Environment Variables** - No secrets in code
✅ **Audit Trail** - Complete transaction history

## 📊 Monitoring Queries

### Check User Balance
```sql
SELECT 
  user_id,
  balance_microcredits / 1000000 as credits,
  subscription_status,
  created_at
FROM user_wallet
WHERE user_id = 'firebase_uid';
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
WHERE user_id = 'firebase_uid'
ORDER BY created_at DESC
LIMIT 10;
```

### View Subscription History
```sql
SELECT 
  created_at,
  amount_paid_cents / 100 as amount_usd,
  grant_microcredits / 1000000 as credits_granted,
  balance_after_microcredits / 1000000 as balance_after
FROM subscription_payments
WHERE user_id = 'firebase_uid'
ORDER BY created_at DESC;
```

## 🎯 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/credits` | GET | Get user's credit balance |
| `/api/subscription/checkout` | POST | Create checkout session |
| `/api/subscription/webhook` | POST | Handle Dodo webhooks |
| `/api/chat` | POST | Chat with cost tracking |
| `/subscription` | - | Pricing page (UI) |
| `/subscription/success` | - | Payment success (UI) |

## 🐛 Troubleshooting

See `SUBSCRIPTION_SETUP.md` for detailed troubleshooting steps.

**Common Issues:**
- Webhook not receiving events → Check URL accessibility
- Credits not deducted → Check OpenRouter generation ID
- Subscription not adding credits → Check webhook logs
- Cap not working → Verify logic in `addSubscriptionCredits`

## 📈 Future Enhancements

Consider adding:
- Usage analytics dashboard
- Credit purchase history page
- Low credit email notifications
- Multiple subscription tiers
- Credit gifting/referrals
- Usage alerts and budgets

## 🎉 You're All Set!

The subscription and credits system is fully implemented and ready to use. Just complete the setup steps above and you'll be live!

For questions or issues:
1. Check `SUBSCRIPTION_SETUP.md` for setup instructions
2. Check `ENV_SETUP.md` for environment variables
3. Review server logs for debugging
4. Contact Dodo Payments support for payment issues

