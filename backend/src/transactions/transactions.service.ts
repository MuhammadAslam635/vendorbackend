import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
// import { CreateZipcodeDto } from 'src/zipcode/dto/create-zipcode.dto';
import { ZipcodeDto } from 'src/zipcode/dto/package-create-zipcode.dto';
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

  async findAll() {
    return this.prisma.transaction.findMany();
  }
  async myAllT(userId: number) {
    console.log("object transactions", userId);
    return this.prisma.transaction.findMany({
      where: {
        userId: userId
      },
      include: {
        subscribe_package: {
          include: {
            zipCodes: true  // Include zipCodes from the subscribe_package
          }
        },
        user: true
      }
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
  async createPaymentSession(userId: number, packageId: number, createZipcodeDto: ZipcodeDto) {
    try {
      const { zipcodes } = createZipcodeDto;
      const pack = await this.prisma.package.findUnique({
        where: { id: packageId }
      });

      if (!pack) {
        throw new BadRequestException('Package not found');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          zipcodes: true
        }
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      // Validate ZIP codes don't already exist
      const existingZipcodes = await this.prisma.zipCode.findMany({
        where: {
          AND: [
            {
              zipcode: {
                in: zipcodes.map(z => z.zipcode)
              }
            },
            {
              userId: userId
            }
          ]
        }
      });

      if (existingZipcodes.length > 0) {
        const duplicateZipcodes = existingZipcodes.map(z => z.zipcode);
        return {
          success: false,
          error: 'DUPLICATE_ZIPCODES',
          message: `You already have the following ZIP codes in your account: ${duplicateZipcodes.join(', ')}`,
          duplicateZipcodes: duplicateZipcodes,
          availableZipcodes: zipcodes
            .map(z => z.zipcode)
            .filter(zipcode => !duplicateZipcodes.includes(zipcode))
        };
      }

      // Create subscription and ZIP codes in a single transaction
      const subscription = await this.prisma.$transaction(async (prisma) => {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + pack.duration);

        // Create subscription first
        const sub = await prisma.subscribePackage.create({
          data: {
            packageId,
            userId,
            startDate: new Date(),
            endDate,
            status: 'PENDING'
          }
        });

        // Create ZIP codes with the subscription ID
        const zipcodeCreationPromises = zipcodes.map(async (zipData) => {
          return await prisma.zipCode.create({
            data: {
              zipcode: zipData.zipcode,
              userId: userId,
              subscribePackageId: sub.id
            }
          });
        });

        // Wait for all ZIP codes to be created
        await Promise.all(zipcodeCreationPromises);

        // Update user's ZIP code count
        // await prisma.user.update({
        //   where: { id: userId },
        //   data: {
        //     addedzipcodes: {
        //       increment: zipcodes.length
        //     },
        //     totalzipcodes: {
        //       increment: pack?.profiles
        //     },
        //     packageActive: 'YES'
        //   }
        // });

        // Create transaction record
        const transaction = await prisma.transaction.create({
          data: {
            amount: pack.price,
            paymentMethod: 'PayPal',
            paymentStatus: 'PENDING',
            subscribePackageId: sub.id,
            userId
          }
        });

        return { sub, transaction };
      });

      console.log("ZIP codes created:", zipcodes.length);

      // Get PayPal API credentials
      const paypalClientId = this.configService.get('PAYPAL_CLIENT_ID');
      const paypalClientSecret = this.configService.get('PAYPAL_CLIENT_SECRET');
      const paypalBaseUrl = this.configService.get('PAYPAL_BASE_URL'); // sandbox or live
      const apiUrl = this.configService.get('API_URL');
      const frontendUrl = this.configService.get('FRONTEND_URL');

      if (!paypalClientId || !paypalClientSecret || !paypalBaseUrl) {
        throw new InternalServerErrorException('PayPal configuration missing');
      }

      const generateOrderId = () => {
        const random = Math.floor(1000 + Math.random() * 9000);
        const timestamp = Date.now().toString().slice(-4);
        return `SUB${timestamp}${random}`;
      };

      const orderId = generateOrderId();
      console.log("Generated Order ID:", orderId,paypalBaseUrl,paypalClientId,paypalClientSecret);

      // Step 1: Get PayPal Access Token
      const authResponse = await axios.post(
        `${paypalBaseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          auth: {
            username: paypalClientId,
            password: paypalClientSecret
          },
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en_US',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const accessToken = authResponse.data.access_token;

      // Step 2: Create PayPal Order
      const orderResponse = await axios.post(
        `${paypalBaseUrl}/v2/checkout/orders`,
        {
          intent: 'CAPTURE',
          purchase_units: [{
            reference_id: orderId,
            amount: {
              currency_code: 'USD',
              value: pack.price.toFixed(2)
            },
            description: pack.name,
            custom_id: subscription.transaction.id.toString(),
            soft_descriptor: pack.name?.substring(0, 22) || 'No description' // PayPal limit
          }],
          application_context: {
            brand_name: 'App Ceration',
            landing_page: 'BILLING',
            user_action: 'PAY_NOW',
            return_url: `${frontendUrl}/vendor/payment-success?transactionId=${subscription.transaction.id}`,
            cancel_url: `${frontendUrl}/vendor/payment-cancel?transactionId=${subscription.transaction.id}`
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'PayPal-Request-Id': orderId 
          }
        }
      );

      console.log('PayPal order creation response:', orderResponse.data);

      // Update user package status
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          totalzipcodes: {
            increment: pack?.profiles,
          },
          addedzipcodes:{
            increment: zipcodes.length
          }
        }
      });

      // Save PayPal order ID to our transaction for reference
      await this.prisma.transaction.update({
        where: { id: subscription.transaction.id },
        data: {
          transactionId: orderResponse.data.id
        }
      });

      // Find the approval URL from PayPal response
      const approvalUrl = orderResponse.data.links.find(link => link.rel === 'approve')?.href;

      if (!approvalUrl) {
        throw new InternalServerErrorException('PayPal approval URL not found');
      }

      return {
        paymentUrl: approvalUrl,
        transactionId: subscription.transaction.id,
        orderId: orderId,
        paypalOrderId: orderResponse.data.id
      };

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('PayPal API Error:', {
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

  // Method to capture PayPal payment after user approval
  async capturePayPalPayment(paypalOrderId: string) {
    try {
      const paypalClientId = this.configService.get('PAYPAL_CLIENT_ID');
      const paypalClientSecret = this.configService.get('PAYPAL_CLIENT_SECRET');
      const paypalBaseUrl = this.configService.get('PAYPAL_BASE_URL');

      // Get access token
      const authResponse = await axios.post(
        `${paypalBaseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          auth: {
            username: paypalClientId,
            password: paypalClientSecret
          },
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en_US',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const accessToken = authResponse.data.access_token;

      // Capture the payment
      const captureResponse = await axios.post(
        `${paypalBaseUrl}/v2/checkout/orders/${paypalOrderId}/capture`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      console.log('PayPal capture response:', captureResponse.data);

      // Update transaction status based on capture result
      const paypalStatus = captureResponse.data.status;
      const transactionStatus = paypalStatus === 'COMPLETED' ? 'COMPLETED' : 'FAILED';

      // Find and update our transaction
      const transaction = await this.prisma.transaction.findFirst({
        where: {
          transactionId: paypalOrderId
        },
        include: {
          subscribe_package: true
        }
      });

      if (transaction) {
        await this.prisma.$transaction(async (prisma) => {
          // Update transaction status
          await prisma.transaction.update({
            where: { id: transaction.id },
            data: {
              paymentStatus: transactionStatus
            }
          });

          // Update subscription status
          if (transactionStatus === 'COMPLETED') {
            await prisma.subscribePackage.update({
              where: { id: transaction.subscribe_package.id },
              data: { status: 'ACTIVE' }
            });

            await prisma.user.update({
              where: { id: transaction.userId },
              data: { packageActive: 'YES' }
            });
          } else {
            await prisma.subscribePackage.update({
              where: { id: transaction.subscribe_package.id },
              data: { status: 'CANCELLED' }
            });
          }
        });
      }

      return captureResponse.data;

    } catch (error) {
      console.error('PayPal capture error:', error);
      throw new InternalServerErrorException('Failed to capture PayPal payment');
    }
  }

  // PayPal webhook handler (optional - for additional security)
  async verifyPayPalWebhook(payload: any, headers: any): Promise<boolean> {
    try {
      const paypalClientId = this.configService.get('PAYPAL_CLIENT_ID');
      const paypalClientSecret = this.configService.get('PAYPAL_CLIENT_SECRET');
      const paypalBaseUrl = this.configService.get('PAYPAL_BASE_URL');
      const webhookId = this.configService.get('PAYPAL_WEBHOOK_ID');

      if (!webhookId) {
        console.log('PayPal webhook verification disabled - no webhook ID configured');
        return true; // Skip verification if not configured
      }

      // Get access token
      const authResponse = await axios.post(
        `${paypalBaseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en_US',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${paypalClientId}:${paypalClientSecret}`).toString('base64')}`
          }
        }
      );

      const accessToken = authResponse.data.access_token;

      // Verify webhook signature
      const verifyResponse = await axios.post(
        `${paypalBaseUrl}/v1/notifications/verify-webhook-signature`,
        {
          auth_algo: headers['paypal-auth-algo'],
          cert_id: headers['paypal-cert-id'],
          transmission_id: headers['paypal-transmission-id'],
          transmission_sig: headers['paypal-transmission-sig'],
          transmission_time: headers['paypal-transmission-time'],
          webhook_id: webhookId,
          webhook_event: payload
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      return verifyResponse.data.verification_status === 'SUCCESS';

    } catch (error) {
      console.error('PayPal webhook verification failed:', error);
      return false;
    }
  }

  // Handle PayPal webhooks (optional)
  async handlePayPalWebhook(payload: any, headers: any) {
    console.log('Processing PayPal webhook payload:', payload);

    try {
      // Verify webhook (optional but recommended for production)
      const isValid = await this.verifyPayPalWebhook(payload, headers);
      if (!isValid) {
        console.error('Invalid PayPal webhook signature');
        return;
      }

      const eventType = payload.event_type;
      const resource = payload.resource;

      // Handle different webhook events
      switch (eventType) {
        case 'CHECKOUT.ORDER.APPROVED':
          console.log('PayPal order approved:', resource.id);
          await this.handlePaymentCompleted(resource);
          break;

        case 'PAYMENT.CAPTURE.COMPLETED':
          await this.handlePaymentCompleted(resource);
          break;

        case 'PAYMENT.CAPTURE.DENIED':
        case 'PAYMENT.CAPTURE.PENDING':
        case 'PAYMENT.CAPTURE.FAILED':
          await this.handlePaymentFailed(resource);
          break;

        default:
          console.log('Unhandled PayPal webhook event:', eventType);
      }

      console.log('PayPal webhook processed successfully');
    } catch (error) {
      console.error('PayPal webhook processing error:', error);
    }
  }

  private async handlePaymentCompleted(resource: any) {
    const customId = resource.custom_id; // This contains our transaction ID
     console.log("first customeId",customId);
    if (customId) {
      await this.prisma.$transaction(async (prisma) => {
        const transaction = await prisma.transaction.findUnique({
          where: { id: parseInt(customId) },
          include: {
            subscribe_package: true
          }
        });
        console.log("Transaction Find");

        if (transaction) {
          await prisma.transaction.update({
            where: { id: transaction.id },
            data: { paymentStatus: resource.status }
          });
          console.log("Transaction status updated");
          await prisma.subscribePackage.update({
            where: { id: transaction.subscribe_package.id },
            data: { status: 'ACTIVE' }
          });
          console.log("Transaction Find");
          await prisma.user.update({
            where: { id: transaction.userId },
            data: { packageActive: 'YES' }
          });
          console.log("Package Updated");
        }
      });
    }
  }

  private async handlePaymentFailed(resource: any) {
    const customId = resource.custom_id;

    if (customId) {
      await this.prisma.$transaction(async (prisma) => {
        const transaction = await prisma.transaction.findUnique({
          where: { id: parseInt(customId) },
          include: {
            subscribe_package: true
          }
        });

        if (transaction) {
          await prisma.transaction.update({
            where: { id: transaction.id },
            data: { paymentStatus: 'FAILED' }
          });

          await prisma.subscribePackage.update({
            where: { id: transaction.subscribe_package.id },
            data: { status: 'CANCELLED' }
          });
        }
      });
    }
  }
  // Add these to your service
  async updateTransactionStatus(transactionId: number, status: string) {
    return this.prisma.transaction.update({
      where: { id: transactionId },
      data: { paymentStatus: status }
    });
  }

  async getTransactionStatus(transactionId: number, userId: number) {
    return this.prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId: userId
      },
      include: {
        subscribe_package: true
      }
    });
  }
  // Remove or simplify confirmPaymentSuccess since webhook will handle everything
  async confirmPaymentSuccess(orderId: string) {
    // This method is not needed if using webhooks
    const transaction = await this.prisma.transaction.findFirst({
      where: { transactionId: orderId },
      include: { subscribe_package: true }
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    // Update transaction status to completed
    await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: { paymentStatus: 'COMPLETED' }
    });
    // Update subscription status to active
    await this.prisma.subscribePackage.update({
      where: { id: transaction.subscribe_package.id },
      data: { status: 'ACTIVE' }
    });
    // Update user package status
    await this.prisma.user.update({
      where: { id: transaction.userId },
      data: { packageActive: 'YES' }
    });
    // Redirect to frontend URL
    // Fixed: Use configService to get frontend URL
    const FRONTEND_URL = this.configService.get('FRONTEND_URL');
    return this.redirect(FRONTEND_URL + '/vendor/dashboard');
  }

  async handlePaymentCancel(orderId: string) {
    try {
      // Validate orderId
      const orderIdNum = parseInt(orderId);
      if (isNaN(orderIdNum)) {
        throw new BadRequestException('Invalid order ID format');
      }
  
      const transaction = await this.prisma.transaction.findFirst({
        where: {
          id: orderIdNum
        },
        include: {
          subscribe_package: true
        }
      });
  
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }
  
      // Check if subscription package exists
      if (!transaction.subscribe_package) {
        throw new NotFoundException('Subscription package not found');
      }
  
      // Update transaction status to cancelled
      await this.prisma.transaction.update({
        where: { id: transaction.id },
        data: { paymentStatus: 'CANCELLED' }
      });
  
      // Update subscription status to cancelled
      await this.prisma.subscribePackage.update({
        where: { id: transaction.subscribe_package.id },
        data: { status: 'CANCELLED' }
      });
  
      // Get zip codes and user data
      const codes = await this.prisma.zipCode.findMany({
        where: {
          subscribePackageId: transaction.subscribe_package.id
        }
      });
  
      const user = await this.prisma.user.findUnique({
        where: { id: transaction.userId }
      });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      // Update user data based on conditions
      if (user.totalzipcodes !== null && user.totalzipcodes !== 0 && codes && codes.length > 0) {
        if (user.totalzipcodes === codes.length) {
          // If user's total zipcodes equals codes being cancelled, set packageActive to 'NO'
          await this.prisma.user.update({
            where: { id: transaction.userId },
            data: {
              packageActive: 'NO',
              totalzipcodes: {
                decrement: codes.length
              },
              addedzipcodes: {
                decrement: codes.length
              }
            }
          });
        } else if (user.totalzipcodes > codes.length) {
          // If user has more zipcodes than being cancelled, only decrement
          await this.prisma.user.update({
            where: { id: transaction.userId },
            data: {
              totalzipcodes: {
                decrement: codes.length
              },
              addedzipcodes: {
                decrement: codes.length
              }
            }
          });
        }
      }
  
      // Delete zip codes (always execute if codes exist)
      if (codes && codes.length > 0) {
        await this.prisma.zipCode.deleteMany({
          where: {
            subscribePackageId: transaction.subscribe_package.id
          }
        });
      }
  
      const FRONTEND_URL = this.configService.get('FRONTEND_URL');
      return this.redirect(`${FRONTEND_URL}/vendor/subscriptions?canceled=true`);
  
    } catch (error) {
      // Log the error for debugging
      console.error('Error in handlePaymentCancel:', error);
      
      // Re-throw known exceptions
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      
      // Handle unexpected errors
      throw new InternalServerErrorException('Failed to cancel payment');
    }
  }

  private redirect(url: string) {
    return {
      statusCode: 302,
      headers: { Location: url },
      body: null
    };
  }


}
