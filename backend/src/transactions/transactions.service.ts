import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
interface WebhookPayload {
  orderId: string;
  status: string;
  transactionId: string;
  amount?: number;
}
@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService,
    private configService: ConfigService
  ) { }
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  async findAll() {
    return this.prisma.transaction.findMany();
  }
  async myAllT(userId: number) {
    console.log("object transactions",userId);
    return this.prisma.transaction.findMany({where: { userId:userId },
      include: {
        subscribe_package: true,
        user: true}
      });
  }

  async findOne(id: number) {
    console.log("Transaction ID:", id);
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: id
      },
      include: {
        subscribe_package: true,
        user: true
      }
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }
 
  async createPaymentSession(userId: number, packageId: number) {
    try {
      const pack = await this.prisma.package.findUnique({
        where: { id: packageId }
      });

      if (!pack) {
        throw new BadRequestException('Package not found');
      }

      // Create subscription record
      const subscription = await this.prisma.$transaction(async (prisma) => {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + pack.duration);

        const sub = await prisma.subscribePackage.create({
          data: {
            packageId,
            userId,
            startDate: new Date(),
            endDate,
            status: 'PENDING'
          }
        });
        const user = await this.prisma.user.findUnique({
          where: { id: userId }
        });
        if (user) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              totalzipcodes: {
                increment: pack?.profiles
              },
              packageActive: 'YES'
            }
          });
        }

        // Create transaction record
        const transaction = await prisma.transaction.create({
          data: {
            amount: pack.price,
            paymentMethod: 'QUICKPAY',
            paymentStatus: 'PENDING',
            subscribe_package_id: sub.id,
            userId
          }
        });

        return { sub, transaction };
      });

      // Get QuickPay API credentials
      const quickPayApiKey = this.configService.get('QUICKPAY_API_KEY');
      const apiUrl = this.configService.get('API_URL');
      const FRONTEND_URL = this.configService.get('FRONTEND_URL');
      const paymentWindowKey = this.configService.get('PAYMENT_WINDOW_KEY');
      
      if (!quickPayApiKey || !apiUrl || !paymentWindowKey) {
        throw new InternalServerErrorException('Payment configuration missing');
      }
      const generateOrderId = () => {
        // Generate a random number between 1000 and 9999
        const random = Math.floor(1000 + Math.random() * 9000);
        // Get current timestamp and take last 4 digits
        const timestamp = Date.now().toString().slice(-4);
        // Combine to create a 12-character order ID
        return `SUB${timestamp}${random}`;
      };
      console.log("object",generateOrderId());
      // Step 1: Create a payment using API Key
      const paymentResponse = await axios.post(
        'https://api.quickpay.net/payments',
        {
          order_id: generateOrderId(), // Will generate something like "SUB12345678"
          currency: 'USD',
          type: 'payment',
          basket: [{
            qty: 1,
            item_no: packageId,
            item_name: pack.name,
            item_price: Math.round(pack.price * 100),
            vat_rate: 0
          }]
        },
        {
          headers: {
            'Accept-Version': 'v10',
            'Authorization': `Basic ${Buffer.from(`:${quickPayApiKey}`).toString('base64')}`,
            'Content-Type': 'application/json',
            'QuickPay-Callback-Url': `${apiUrl}/transactions/webhook`
          }
        }
      );
      console.log('Payment creation response:', paymentResponse.data);
      const merchantId = this.configService.get('QUICKPAY_MERCHANT_ID');
      // Step 2: Create a payment link using API Key
      const paymentId = paymentResponse.data.id;
      const linkResponse = await axios.put(
        `https://api.quickpay.net/payments/${paymentId}/link`,
        {
          merchant_id: merchantId,
          amount: Math.round(pack.price * 100), // Amount in cents
          continue_url: `${FRONTEND_URL}/transactions/payment-success`,
          cancel_url: `${FRONTEND_URL}/transactions/payment-cancel`,
          callback_url: `${apiUrl}/transactions/webhook`,
          auto_capture: true,
          language: 'en',
          payment_methods: 'creditcard', // Add supported payment methods
          framed: false
        },
        {
          headers: {
            'Accept-Version': 'v10',
            'Authorization': `Basic ${Buffer.from(`:${quickPayApiKey}`).toString('base64')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Payment link response:', linkResponse.data);
      // Save QuickPay payment ID to our transaction for reference
      await this.prisma.transaction.update({
        where: { id: subscription.transaction.id },
        data: { 
          transactionId: paymentId.toString()
        }
      });

      return {
        paymentUrl: linkResponse.data.url,
        transactionId: subscription.transaction.id,
        orderId: generateOrderId()
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('QuickPay API Error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        throw new BadRequestException(`Payment creation failed: ${error.response?.data?.message || error.message}`);
      }
      console.error('Payment session creation failed:', error);
      throw new InternalServerErrorException('Failed to create payment session');
    }
  }

  async verifyWebhookSignature(payload: any, signature: string): Promise<boolean> {
    try {
      // Get the private key from config
      const privateKey = this.configService.get('QUICKPAY_PRIVATE_KEY');
      
      if (!privateKey) {
        console.error('Private key not configured');
        return false;
      }
  
      // According to QuickPay documentation, create a checksum to compare
      // This is a simplified example, implement according to QuickPay's docs
      const crypto = require('crypto');
      const payloadString = JSON.stringify(payload);
      const calculatedSignature = crypto
        .createHmac('sha256', privateKey)
        .update(payloadString)
        .digest('hex');
      
      return calculatedSignature === signature;
    } catch (error) {
      console.error('Signature verification failed:', error);
      return false;
    }
  }

  // Update the handleWebhook method
  async handleWebhook(payload: WebhookPayload) {
    console.log('Processing webhook payload:', payload);
    const subscriptionId = payload.orderId?.substring(4);
    const FRONTEND_URL = this.configService.get('FRONTEND_URL');
    
    if (!subscriptionId) {
      console.error('Invalid order ID format:', payload.orderId);
      return this.redirect(FRONTEND_URL + '/dashboard/subscription?error=invalid_order');
    }
  
    try {
      await this.prisma.$transaction(async (prisma) => {
        const subscription = await prisma.subscribePackage.findFirst({
          where: { id: parseInt(subscriptionId) },
          include: { 
            transaction: true,
            user: true
          }
        });
  
        if (!subscription) {
          throw new BadRequestException('Subscription not found');
        }
  
        const transaction = subscription.transaction;
  
        // Update transaction status and QuickPay transaction ID
        await prisma.transaction.update({
          where: { id: transaction?.id },
          data: {
            paymentStatus: payload.status,
            transactionId: payload.transactionId?.toString()
          },
        });
        console.log('Transaction status updated');
  
        // Update subscription and user if payment successful
        if (payload.status === 'COMPLETED') {
          await prisma.subscribePackage.update({
            where: { id: subscription.id },
            data: { status: 'ACTIVE' }
          });
          console.log('Subscription activated');
  
          await prisma.user.update({
            where: { id: subscription.userId },
            data: { packageActive: 'YES' }
          });
          console.log('User package status updated');
  
          // Return success response with redirect
          return this.redirect(FRONTEND_URL + '/vendor/dashboard/subscription?success=true');
        } else if (payload.status === 'CANCELLED' || payload.status === 'FAILED') {
          // Handle failed or cancelled payments
          await prisma.subscribePackage.update({
            where: { id: subscription.id },
            data: { status: 'CANCELLED' }
          });
          console.log('Subscription cancelled');
  
          return this.redirect(FRONTEND_URL + '/vendor/dashboard/subscription?error=payment_failed');
        }
      });
      
      console.log('Webhook processed successfully:', payload);
      return this.redirect(FRONTEND_URL + '/vendor/dashboard/subscription?status=' + payload.status.toLowerCase());
  
    } catch (error) {
      console.error('Webhook processing error:', error);
      return this.redirect(FRONTEND_URL + '/vendor/dashboard/subscription?error=system_error');
    }
  }
  
  // Remove or simplify confirmPaymentSuccess since webhook will handle everything
  async confirmPaymentSuccess(orderId: string) {
    const FRONTEND_URL = this.configService.get('FRONTEND_URL');
    return this.redirect(FRONTEND_URL + '/vendor/dashboard/subscription');
  }
  
  async handlePaymentCancel(orderId: string) {
    const FRONTEND_URL = this.configService.get('FRONTEND_URL');
    return this.redirect(FRONTEND_URL + '/vendor/dashboard/subscription?canceled=true');
  }
  
  private redirect(url: string) {
    return {
      statusCode: 302,
      headers: { Location: url },
      body: null
    };
  }

  
}
