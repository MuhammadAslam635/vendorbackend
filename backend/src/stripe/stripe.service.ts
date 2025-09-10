import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {
    const stripeSecretKey = this.configService.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-08-27.basil',
    });
  }

  // Create a Stripe customer
  async createCustomer(userData: { name: string; email: string; phone?: string }): Promise<Stripe.Customer> {
    try {
      const customer = await this.stripe.customers.create({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        metadata: {
          source: 'vendor_backend'
        }
      });
      return customer;
    } catch (error) {
      console.error('Error creating Stripe customer:', error);
      throw new InternalServerErrorException('Failed to create customer');
    }
  }

  // Create a Stripe product
  async createProduct(productData: { 
    name: string; 
    description?: string;
    profiles?: number;
    duration?: number;
  }): Promise<Stripe.Product> {
    try {
      const product = await this.stripe.products.create({
        name: productData.name,
        description: productData.description,
        metadata: {
          source: 'vendor_backend',
          profiles: productData.profiles?.toString() || '0',
          duration: productData.duration?.toString() || '1'
        }
      });
      return product;
    } catch (error) {
      console.error('Error creating Stripe product:', error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  // Create a Stripe price using the same amount as the local database
  // This ensures price consistency between local database and Stripe
  // Packages are yearly-based, so interval should typically be 'year'
  async createPrice(priceData: { 
    productId: string; 
    amount: number; // This should match the price in the local database
    currency?: string;
    interval?: 'month' | 'year'; // Use 'year' for yearly packages
    intervalCount?: number;
  }): Promise<Stripe.Price> {
    try {
      const price = await this.stripe.prices.create({
        product: priceData.productId,
        unit_amount: Math.round(priceData.amount * 100), // Convert to cents
        currency: priceData.currency || 'usd',
        recurring: priceData.interval ? {
          interval: priceData.interval,
          interval_count: priceData.intervalCount || 1
        } : undefined,
        metadata: {
          source: 'vendor_backend',
          local_price: priceData.amount.toString() // Store local price for reference
        }
      });
      return price;
    } catch (error) {
      console.error('Error creating Stripe price:', error);
      throw new InternalServerErrorException('Failed to create price');
    }
  }

  // Create a Stripe subscription
  async createSubscription(subscriptionData: {
    customerId: string;
    priceId: string;
    metadata?: Record<string, string>;
    trialEnd?: number; // Unix timestamp for trial end
  }): Promise<Stripe.Subscription> {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: subscriptionData.customerId,
        items: [{
          price: subscriptionData.priceId,
        }],
        metadata: subscriptionData.metadata || {},
        trial_end: subscriptionData.trialEnd,
        expand: ['latest_invoice.payment_intent'],
      });
      return subscription;
    } catch (error) {
      console.error('Error creating Stripe subscription:', error);
      throw new InternalServerErrorException('Failed to create subscription');
    }
  }

  // Create a checkout session for subscription
  async createCheckoutSession(sessionData: {
    customerId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        customer: sessionData.customerId,
        payment_method_types: ['card'],
        line_items: [{
          price: sessionData.priceId,
          quantity: 1,
        }],
        mode: 'subscription',
        success_url: sessionData.successUrl,
        cancel_url: sessionData.cancelUrl,
        metadata: sessionData.metadata || {},
        subscription_data: {
          metadata: sessionData.metadata || {},
        },
      });
      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new InternalServerErrorException('Failed to create checkout session');
    }
  }

  // Retrieve a subscription
  async getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
      return subscription;
    } catch (error) {
      console.error('Error retrieving subscription:', error);
      throw new InternalServerErrorException('Failed to retrieve subscription');
    }
  }

  // Cancel a subscription
  async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      const subscription = await this.stripe.subscriptions.cancel(subscriptionId);
      return subscription;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw new InternalServerErrorException('Failed to cancel subscription');
    }
  }

  // Update a subscription
  async updateSubscription(subscriptionId: string, updateData: {
    priceId?: string;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Subscription> {
    try {
      const subscription = await this.stripe.subscriptions.update(subscriptionId, {
        items: updateData.priceId ? [{
          price: updateData.priceId,
        }] : undefined,
        metadata: updateData.metadata,
      });
      return subscription;
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw new InternalServerErrorException('Failed to update subscription');
    }
  }

  // Delete a product
  async deleteProduct(productId: string): Promise<Stripe.DeletedProduct> {
    try {
      const product = await this.stripe.products.del(productId);
      return product;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new InternalServerErrorException('Failed to delete product');
    }
  }

  // Update a product
  async updateProduct(productId: string, updateData: {
    name?: string;
    description?: string;
    active?: boolean;
    profiles?: number;
    duration?: number;
  }): Promise<Stripe.Product> {
    try {
      const updatePayload: any = {
        name: updateData.name,
        description: updateData.description,
        active: updateData.active
      };

      // Add metadata if profiles or duration are being updated
      if (updateData.profiles !== undefined || updateData.duration !== undefined) {
        updatePayload.metadata = {
          source: 'vendor_backend',
          profiles: updateData.profiles?.toString() || '0',
          duration: updateData.duration?.toString() || '1'
        };
      }

      const product = await this.stripe.products.update(productId, updatePayload);
      return product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new InternalServerErrorException('Failed to update product');
    }
  }

  // Construct webhook event
  constructWebhookEvent(payload: string | Buffer, signature: string, secret: string): Stripe.Event {
    try {
      return this.stripe.webhooks.constructEvent(payload, signature, secret);
    } catch (error) {
      console.error('Error constructing webhook event:', error);
      throw new BadRequestException('Invalid webhook signature');
    }
  }
}
