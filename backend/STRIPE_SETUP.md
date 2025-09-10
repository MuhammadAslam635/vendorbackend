# Stripe Integration Setup

This document explains how to set up Stripe integration for the vendor backend application.

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLIC_KEY="pk_test_your_stripe_public_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

## Stripe Dashboard Setup

1. **Create a Stripe Account**: Go to [stripe.com](https://stripe.com) and create an account
2. **Get API Keys**: 
   - Go to Developers > API Keys
   - Copy your Publishable key (starts with `pk_test_`)
   - Copy your Secret key (starts with `sk_test_`)

3. **Set up Webhooks**:
   - Go to Developers > Webhooks
   - Click "Add endpoint"
   - Set URL to: `https://yourdomain.com/transactions/webhook/stripe`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copy the webhook signing secret (starts with `whsec_`)

## Database Migration

Run the following command to apply the database changes:

```bash
npx prisma migrate dev --name add-stripe-fields
```

## Testing

1. **Test Mode**: Use Stripe test keys for development
2. **Test Cards**: Use Stripe test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - 3D Secure: `4000 0025 0000 3155`

## Package Creation

When creating packages through the admin panel, the system will automatically:
1. Create a Stripe product
2. Create a Stripe price
3. Store the Stripe IDs in the database

## Subscription Flow

1. User selects a package and ZIP codes
2. System creates a Stripe customer (if not exists)
3. System creates a Stripe checkout session with yearly billing
4. User completes payment on Stripe
5. Webhook processes the payment and activates subscription
6. User is redirected back to the application

**Note**: All packages are billed yearly, not monthly. Each subscription lasts exactly 1 year from the subscription start date, regardless of the package duration field.

## Webhook Security

The webhook endpoint verifies the Stripe signature to ensure requests are legitimate. Make sure to:
1. Use HTTPS in production
2. Keep your webhook secret secure
3. Monitor webhook logs in Stripe dashboard

## Production Deployment

1. Switch to live Stripe keys
2. Update webhook URL to production domain
3. Test thoroughly with real payment methods
4. Monitor webhook delivery and processing
