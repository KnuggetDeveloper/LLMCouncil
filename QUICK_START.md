# Quick Start Guide - Subscription System

Get your subscription and credits system up and running in 10 minutes.

## ✅ Pre-Implementation Checklist (Already Done)

- [x] Database schema updated
- [x] Credits management library created
- [x] Auth sync creates wallets
- [x] Checkout API created
- [x] Webhook handler implemented (using `@dodopayments/nextjs` adapter)
- [x] Credits balance API created
- [x] Chat API tracks costs
- [x] UI components created
- [x] Documentation written

## 🚀 Setup Checklist (You Need to Do)

### 1. Create Dodo Payments Account
- [ ] Sign up at [dodopayments.com](https://dodopayments.com)
- [ ] Switch to **Test Mode** for development
- [ ] Note your API key from Settings → API Keys

### 2. Create Subscription Product
- [ ] Go to **Products** → **Create Product**
- [ ] Set details:
  - Name: `LLM Council Pro`
  - Type: `Subscription`
  - Price: `$20.00 USD`
  - Billing: `Monthly`
- [ ] Copy the **Product ID** (starts with `pdt_`)

### 3. Configure Webhook
- [ ] Go to **Webhooks** → **Create Webhook**
- [ ] Set URL: `https://yourdomain.com/api/subscription/webhook`
  - Local dev: Use [ngrok](https://ngrok.com) to expose localhost
- [ ] Select events:
  - [x] `payment.succeeded`
  - [x] `subscription.active`
  - [x] `subscription.renewed`
  - [x] `subscription.cancelled`
  - [x] `subscription.expired`
  - [x] `subscription.failed`
- [ ] Copy the **Webhook Secret** (starts with `whsec_`)

### 4. Set Environment Variables
Create or update your `.env` file:

```env
# Dodo Payments (new)
DODO_PAYMENTS_API_KEY=sk_test_xxxxx  # From step 1
DODO_PAYMENTS_WEBHOOK_KEY=whsec_xxxxx  # From step 3
DODO_PAYMENTS_ENVIRONMENT=test_mode
DODO_PAYMENTS_RETURN_URL=http://localhost:3000/subscription/success
DODO_PRODUCT_ID=pdt_xxxxx  # From step 2

# Site URL (new)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Existing (keep these)
DATABASE_URL=postgresql://...
FIREBASE_ADMIN_PROJECT_ID=...
FIREBASE_ADMIN_CLIENT_EMAIL=...
FIREBASE_ADMIN_PRIVATE_KEY=...
```

### 5. Run Database Migration
```bash
# Create migration
npx prisma migrate dev --name add_credits_system

# Generate Prisma client
npx prisma generate
```

### 6. Start Development Server
```bash
npm run dev
```

### 7. Test the System

#### Test 1: New User Signup
1. [ ] Sign up with Google
2. [ ] Check database: User should have 1,500 credits
```sql
SELECT * FROM user_wallet WHERE user_id = 'your_firebase_uid';
```

#### Test 2: Make API Request
1. [ ] Make a chat request
2. [ ] Check credits are deducted
3. [ ] View in database:
```sql
SELECT * FROM credit_usage WHERE user_id = 'your_firebase_uid';
```

#### Test 3: Subscribe
1. [ ] Navigate to `/subscription`
2. [ ] Click "Subscribe Now"
3. [ ] Complete test payment (use Dodo test card)
4. [ ] Verify webhook received (check server logs)
5. [ ] Check credits added (should be original + 20,000, capped at 40,000)

### 8. Add Credits Display to UI (Optional)
Update your main layout to show credits:

```tsx
// src/app/layout.tsx or header component
import CreditsDisplay from "@/components/CreditsDisplay";

<CreditsDisplay />
```

## 🧪 Test Cards (Dodo Payments Test Mode)

Check [Dodo Payments Test Cards](https://docs.dodopayments.com/testing) for test payment methods.

## 🔍 Verification Commands

### Check Credits Balance
```bash
# In your database
SELECT 
  user_id,
  balance_microcredits / 1000000 as credits,
  subscription_status
FROM user_wallet;
```

### Check Recent Usage
```bash
SELECT 
  created_at,
  model_used,
  cost_microusd / 1000000 as cost_usd,
  debit_microcredits / 1000000 as credits_used
FROM credit_usage
ORDER BY created_at DESC
LIMIT 5;
```

### Check Webhook Events
```bash
# Check your server logs for:
# "Received webhook event: payment.succeeded"
# "Successfully added credits for user X"
```

## 📱 UI Routes to Test

- `/` - Main app (should show credits in header if you added `CreditsDisplay`)
- `/subscription` - Pricing page
- `/subscription/success` - Post-payment success page

## ⚠️ Common Issues

### Webhook not working locally
**Solution:** Use ngrok to expose your local server:
```bash
ngrok http 3000
# Use the ngrok URL in Dodo webhook config
```

### Credits not deducted after API call
**Solution:** Check:
- OpenRouter returned generation ID in response headers
- Stats API call succeeded (check logs)
- User has sufficient credits

### Subscription payment succeeded but no credits added
**Solution:** Check:
- Webhook received (check Dodo dashboard logs)
- Webhook secret is correct
- `user_id` in metadata matches Firebase UID
- Server logs for errors

## 🎯 Quick Test Script

Run this after setup to verify everything:

```bash
# 1. Check database connection
npx prisma db push

# 2. Check app builds
npm run build

# 3. Start dev server
npm run dev

# 4. In another terminal, check logs
# Make a request and watch for:
# - "Credits deducted for user X"
# - "New balance: Y"
```

## 📚 Additional Documentation

- **Complete Setup Guide:** `SUBSCRIPTION_SETUP.md`
- **Environment Variables:** `ENV_SETUP.md`
- **Implementation Details:** `IMPLEMENTATION_SUMMARY.md`

## 🎉 Done!

Once all checkboxes are complete and tests pass, your subscription system is live!

### What Users Will Experience:
1. **Sign up** → Get 1,500 free credits automatically
2. **Use the app** → Credits deducted based on actual OpenRouter costs
3. **Subscribe** → Get 20,000 credits/month with 2-month rollover
4. **See balance** → Real-time credits display in the app

### What You Get:
- ✅ Automatic credit management
- ✅ Idempotent operations (no double-charging)
- ✅ Complete audit trail
- ✅ Secure webhook handling
- ✅ Beautiful UI components
- ✅ Production-ready code

## 🆘 Need Help?

1. Check server logs: `npm run dev` and watch console
2. Check Dodo webhook logs: Dashboard → Webhooks → View Logs
3. Check database: Run the SQL queries above
4. Review documentation files
5. Contact: support@dodopayments.com

---

**Ready to go live?** Switch to **Live Mode** in Dodo dashboard and update your environment variables!

