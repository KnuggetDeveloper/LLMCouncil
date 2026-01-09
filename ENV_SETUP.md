# Environment Variables Setup Guide

This document describes all environment variables needed for the LLM Council application with subscription system.

## Required Environment Variables

### Database Configuration

```env
DATABASE_URL=postgresql://username:password@host:port/database
```

**Where to get it:**

- Set up a PostgreSQL database (local or cloud)
- Format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME`
- Example: `postgresql://postgres:mypassword@localhost:5432/llmcouncil`

### Firebase Admin (Authentication)

```env
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

**Where to get them:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Download the JSON file
6. Extract the values:
   - `project_id` → `FIREBASE_ADMIN_PROJECT_ID`
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY`

**Important:** The private key must include the literal `\n` characters for newlines.

### Dodo Payments (Subscriptions)

```env
DODO_PAYMENTS_API_KEY=sk_test_xxxxxxxxxxxxx
DODO_PAYMENTS_WEBHOOK_KEY=whsec_xxxxxxxxxxxxx
DODO_PAYMENTS_ENVIRONMENT=test_mode
DODO_PAYMENTS_RETURN_URL=http://localhost:3000/subscription/success
DODO_PRODUCT_ID=pdt_xxxxxxxxxxxxx
```

**Where to get them:**

#### 1. API Key (`DODO_PAYMENTS_API_KEY`)

1. Log in to [Dodo Payments Dashboard](https://dodopayments.com)
2. Go to **Settings** → **API Keys**
3. Click **Create API Key**
4. Copy the key (starts with `sk_test_` for test mode or `sk_live_` for live mode)

#### 2. Webhook Key (`DODO_PAYMENTS_WEBHOOK_KEY`)

1. In Dodo Payments Dashboard, go to **Webhooks**
2. Click **Create Webhook**
3. Set URL to: `https://yourdomain.com/api/subscription/webhook`
4. Select events:
   - `payment.succeeded`
   - `subscription.active`
   - `subscription.renewed`
   - `subscription.cancelled`
   - `subscription.expired`
   - `subscription.failed`
5. Copy the **Webhook Secret** (starts with `whsec_`)

#### 3. Environment (`DODO_PAYMENTS_ENVIRONMENT`)

- Use `test_mode` for development and testing
- Use `live_mode` for production

#### 4. Return URL (`DODO_PAYMENTS_RETURN_URL`)

- URL where users are redirected after successful payment
- Development: `http://localhost:3000/subscription/success`
- Production: `https://yourdomain.com/subscription/success`

#### 5. Product ID (`DODO_PRODUCT_ID`)

1. In Dodo Payments Dashboard, go to **Products**
2. Click **Create Product**
3. Set up your subscription product:
   - **Name**: "LLM Council Pro"
   - **Type**: Subscription
   - **Price**: $20.00 USD
   - **Billing Period**: Monthly
4. Copy the **Product ID** (starts with `pdt_`)

### Site Configuration

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

**Where to set them:**

- `NEXT_PUBLIC_SITE_URL`: Your application's public URL
  - Development: `http://localhost:3000`
  - Production: `https://yourdomain.com`
- `NODE_ENV`: Automatically set by Next.js (`development` or `production`)

## Complete `.env` File Example

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/llmcouncil

# Firebase Admin
FIREBASE_ADMIN_PROJECT_ID=my-project-12345
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@my-project-12345.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# Dodo Payments
DODO_PAYMENTS_API_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
DODO_PAYMENTS_WEBHOOK_KEY=whsec_xxxxxxxxxxxxxxxxxxxxx
DODO_PAYMENTS_ENVIRONMENT=test_mode
DODO_PAYMENTS_RETURN_URL=http://localhost:3000/subscription/success
DODO_PRODUCT_ID=pdt_xxxxxxxxxxxxx

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

## Deployment-Specific Instructions

### Vercel

1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add each variable with its value
4. Set the environment (Production, Preview, Development)
5. Save changes

### Netlify

1. Go to **Site Settings** → **Environment Variables**
2. Click **Add a variable**
3. Add each variable with its value
4. Deploy your site

### Docker

Create a `.env` file or pass environment variables in your `docker-compose.yml`:

```yaml
environment:
  - DATABASE_URL=${DATABASE_URL}
  - FIREBASE_ADMIN_PROJECT_ID=${FIREBASE_ADMIN_PROJECT_ID}
  - FIREBASE_ADMIN_CLIENT_EMAIL=${FIREBASE_ADMIN_CLIENT_EMAIL}
  - FIREBASE_ADMIN_PRIVATE_KEY=${FIREBASE_ADMIN_PRIVATE_KEY}
  - DODO_PAYMENTS_API_KEY=${DODO_PAYMENTS_API_KEY}
  - DODO_PAYMENTS_WEBHOOK_KEY=${DODO_PAYMENTS_WEBHOOK_KEY}
  - DODO_PAYMENTS_ENVIRONMENT=${DODO_PAYMENTS_ENVIRONMENT}
  - DODO_PAYMENTS_RETURN_URL=${DODO_PAYMENTS_RETURN_URL}
  - DODO_PRODUCT_ID=${DODO_PRODUCT_ID}
  - NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
```

## Security Best Practices

1. **Never commit `.env` files** to version control
2. Add `.env*` to your `.gitignore` file
3. Use different keys for development and production
4. Rotate keys periodically
5. Restrict API key permissions where possible
6. Use environment-specific URLs (test vs live)
7. Keep webhook secrets secure

## Testing Your Configuration

After setting up environment variables, test them:

```bash
# Test database connection
npx prisma db push

# Test Next.js build
npm run build

# Test in development
npm run dev
```

## Troubleshooting

### "Missing environment variable" error

- Verify the variable name matches exactly (case-sensitive)
- Check for typos in `.env` file
- Restart your development server after adding variables

### Firebase authentication fails

- Verify private key format (must include `\n` for newlines)
- Check project ID matches your Firebase project
- Ensure service account has required permissions

### Dodo Payments webhook fails

- Verify webhook URL is publicly accessible
- Check webhook secret is correct
- Test with ngrok for local development
- Review webhook logs in Dodo dashboard

### Database connection fails

- Verify DATABASE_URL format
- Check database is running
- Verify credentials are correct
- Check firewall rules allow connection

## Need Help?

- **Dodo Payments**: support@dodopayments.com
- **Firebase**: [Firebase Support](https://firebase.google.com/support)
- **PostgreSQL**: Check your hosting provider's documentation
