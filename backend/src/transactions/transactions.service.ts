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
    try {
      console.log("Transaction ID:", id);
      const transaction = await this.prisma.transaction.findUnique({
        where: {
          id: id
        },
        include: {
          subscribe_package: {
            include: {
              zipCodes: true,
              package: true
            }
          },
          user: true
        }
      });

      if (!transaction) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }

      return transaction;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving transaction');
    }
  }
  // This method is replaced by the comprehensive deleteTransaction method below

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    try{
      return this.prisma.transaction.update({
        where: { id },
        data: {
          paymentStatus: updateTransactionDto.paymentStatus
        }
      });
      return {
        status: 'success',
        message: 'Transaction updated successfully',
      };

    }catch(e){
      throw new BadRequestException('Failed to update transaction');
    }
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
      // Check if the capture was successful by looking at the capture details
      const captureDetails = captureResponse.data.purchase_units?.[0]?.payments?.captures?.[0];
      const captureStatus = captureDetails?.status;
      const orderStatus = captureResponse.data.status;
      
      console.log('Capture details:', { captureStatus, orderStatus, captureDetails });
      
      // Transaction is completed if order is completed and capture is completed
      const transactionStatus = (orderStatus === 'COMPLETED' && captureStatus === 'COMPLETED') ? 'COMPLETED' : 'FAILED';
      
      console.log('Final transaction status:', transactionStatus);

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
    const orderId = resource.id; // PayPal Order ID
    console.log("Processing order ID:", orderId, "Initial status:", resource.status);
    
    if (orderId) {
      try {
        // Step 1: Verify payment status with PayPal API
        const paypalOrderDetails = await this.verifyPaymentWithPayPal(orderId);
        
        if (!paypalOrderDetails || (paypalOrderDetails.status !== 'COMPLETED' && paypalOrderDetails.status !== 'APPROVED')) {
          console.log("Payment verification failed or not completed:", paypalOrderDetails?.status);
          return;
        }

        // Step 2: Extract custom_id from PayPal response
        const customId = paypalOrderDetails.purchase_units?.[0]?.custom_id;
        if (!customId) {
          console.log("No custom_id found in PayPal response");
          return;
        }

        // Step 3: Update database in transaction
        await this.prisma.$transaction(async (prisma) => {
          const transaction = await prisma.transaction.findUnique({
            where: { id: parseInt(customId) },
            include: {
              subscribe_package: {
                include: {
                  package: true
                }
              }
            }
          });
          
          console.log("Transaction found:", transaction?.id);

          if (transaction && transaction.paymentStatus !== 'COMPLETED') {
            // Update transaction status
            await prisma.transaction.update({
              where: { id: transaction.id },
              data: { 
                paymentStatus: 'COMPLETED'
              }
            });
            console.log("Transaction status updated to COMPLETED");

            // Activate subscription package
            await prisma.subscribePackage.update({
              where: { id: transaction.subscribe_package.id },
              data: { 
                status: 'ACTIVE'
              }
            });
            console.log("Package activated");

            // Get the zipcodes associated with this subscription package
            const zipcodes = await prisma.zipCode.findMany({
              where: { subscribePackageId: transaction.subscribe_package.id }
            });

            // Update user package status and zipcode counts
            await prisma.user.update({
              where: { id: transaction.userId },
              data: { 
                packageActive: 'YES',
                addedzipcodes: {
                  increment: zipcodes.length
                },
                totalzipcodes: {
                  increment: transaction.subscribe_package.package.profiles
                }
              }
            });
            console.log("User package status updated");
            console.log(`Updated user zipcode counts: added ${zipcodes.length} zipcodes, total profiles ${transaction.subscribe_package.package.profiles}`);
          } else if (transaction?.paymentStatus === 'COMPLETED') {
            console.log("Payment already processed for transaction:", customId);
          }
        });
      } catch (error) {
        console.error("Error processing payment completion:", error);
        throw error;
      }
    }
  }

  private async verifyPaymentWithPayPal(orderId: string) {
    try {
      // Get PayPal access token
      const accessToken = await this.getPayPalAccessToken();
      const paypalBaseUrl = this.configService.get('PAYPAL_BASE_URL');
      
      // Call PayPal API to get order details
      const response = await axios.get(`${paypalBaseUrl}/v2/checkout/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const orderDetails = response.data;
      console.log("PayPal order verification:", {
        id: orderDetails.id,
        status: orderDetails.status,
        intent: orderDetails.intent,
        customId: orderDetails.purchase_units?.[0]?.custom_id
      });

      return orderDetails;
    } catch (error) {
      console.error("Error verifying payment with PayPal:", error);
      return null;
    }
  }

  private async getPayPalAccessToken(): Promise<string> {
    try {
      const paypalClientId = this.configService.get('PAYPAL_CLIENT_ID');
      const paypalClientSecret = this.configService.get('PAYPAL_CLIENT_SECRET');
      const paypalBaseUrl = this.configService.get('PAYPAL_BASE_URL');

      const auth = Buffer.from(`${paypalClientId}:${paypalClientSecret}`).toString('base64');

      const response = await axios.post(
        `${paypalBaseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en_US',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${auth}`
          }
        }
      );

      return response.data.access_token;
    } catch (error) {
      console.error("Error getting PayPal access token:", error);
      throw error;
    }
  }

  private async handlePaymentFailed(resource: any) {
    const customId = resource.id;

    if (customId) {
      await this.prisma.$transaction(async (prisma) => {
        const transaction = await prisma.transaction.findUnique({
          where: { transactionId:customId },
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

  async adminUpdateTransactionToComplete(transactionId: number, adminUserId: number) {
    try {
      // Find the transaction with related data
      const transaction = await this.prisma.transaction.findUnique({
        where: { id: transactionId },
        include: {
          subscribe_package: {
            include: {
              package: true
            }
          },
          user: true
        }
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      // Check if transaction is in PENDING status
      if (transaction.paymentStatus !== 'PENDING' && transaction.paymentStatus !== 'FAILED' && transaction.paymentStatus !== 'CANCELLED') {

        throw new BadRequestException(`Transaction is not in PENDING status. Current status: ${transaction.paymentStatus}`);
      }

      // Use database transaction to ensure consistency
      await this.prisma.$transaction(async (prisma) => {
        // Update transaction status to COMPLETED
        await prisma.transaction.update({
          where: { id: transactionId },
          data: { 
            paymentStatus: 'COMPLETED',
            updatedAt: new Date()
          }
        });

        // Activate subscription package
        await prisma.subscribePackage.update({
          where: { id: transaction.subscribe_package.id },
          data: { 
            status: 'ACTIVE',
            updatedAt: new Date()
          }
        });

        // Get the zipcodes associated with this subscription package
        const zipcodes = await prisma.zipCode.findMany({
          where: { subscribePackageId: transaction.subscribe_package.id }
        });

        // Update user package status and zipcode counts
        await prisma.user.update({
          where: { id: transaction.userId },
          data: { 
            packageActive: 'YES',
            addedzipcodes: {
              increment: zipcodes.length
            },
            totalzipcodes: {
              increment: transaction.subscribe_package.package.profiles
            },
            updatedAt: new Date()
          }
        });

        console.log(`Admin ${adminUserId} marked transaction ${transactionId} as COMPLETED`);
        console.log(`Updated user zipcode counts: added ${zipcodes.length} zipcodes, total profiles ${transaction.subscribe_package.package.profiles}`);
      });

      return {
        status: 'success',
        message: 'Transaction marked as completed successfully',
        data: {
          transactionId: transactionId,
          newStatus: 'COMPLETED',
          packageActivated: true,
          userPackageActive: true
        }
      };

    } catch (error) {
      console.error('Error updating transaction to complete:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update transaction status');
    }
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
  // Confirm payment success and complete the transaction
 async confirmPaymentSuccess(internalTransactionId: string) {
  try {
    console.log('Confirming payment success for internal transaction:', internalTransactionId);
    
    // Find transaction by your internal ID, not PayPal order ID
    const transaction = await this.prisma.transaction.findFirst({
      where: { id: parseInt(internalTransactionId) },
      include: { 
        subscribe_package: {
          include: {
            package: true
          }
        },
        user: true
      }
    });
    
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (!transaction.transactionId) {
      throw new BadRequestException('PayPal order ID not found for this transaction');
    }
    
    // Check if transaction is already completed
    if (transaction.paymentStatus === 'COMPLETED') {
      console.log('Transaction already completed:', transaction.id);
      const FRONTEND_URL = this.configService.get('FRONTEND_URL');
      return this.redirect(FRONTEND_URL + '/vendor/dashboard');
    }

    // FIRST: Capture the payment with PayPal using the stored PayPal order ID
    const captureResult = await this.capturePayPalPayment(transaction.transactionId);
    console.log('PayPal capture result:', captureResult);
    
    // Verify the capture was successful
    const captureStatus = captureResult.status;
    const captureDetails = captureResult.purchase_units?.[0]?.payments?.captures?.[0];
    
    if (captureStatus !== 'COMPLETED' || captureDetails?.status !== 'COMPLETED') {
      throw new BadRequestException('Payment capture failed');
    }
    
    // Use database transaction to ensure consistency
    await this.prisma.$transaction(async (prisma) => {
      // Update transaction status to completed
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { paymentStatus: 'COMPLETED' }
      });
      
      // Update subscription status to active
      await prisma.subscribePackage.update({
        where: { id: transaction.subscribe_package.id },
        data: { status: 'ACTIVE' }
      });
      
      // Update user package status
      await prisma.user.update({
        where: { id: transaction.userId },
        data: { packageActive: 'YES' }
      });
      
      console.log('Payment confirmation completed for transaction:', transaction.id);
    });
    
    const FRONTEND_URL = this.configService.get('FRONTEND_URL');
    return this.redirect(FRONTEND_URL + '/vendor/dashboard');
    
  } catch (error) {
    console.error('Error confirming payment success:', error);
    
    // Re-throw known exceptions
    if (error instanceof NotFoundException || error instanceof BadRequestException) {
      throw error;
    }
    
    // Handle PayPal API errors specifically
    if (error.response && error.response.status === 404) {
      throw new BadRequestException('PayPal order not found - payment may have already been processed or cancelled');
    }
    
    const FRONTEND_URL = this.configService.get('FRONTEND_URL');
    return this.redirect(FRONTEND_URL + '/vendor/payment-failed');
  }
}

  // Delete transaction and all related records
  async adminDeleteTransaction(transactionId: number, userId: number) {
    try {
      // Find the transaction with all related data (admin can delete any transaction)
      const transaction = await this.prisma.transaction.findFirst({
        where: {
          id: transactionId,
          OR: [
            { paymentStatus: 'PENDING' },
            { paymentStatus: 'FAILED' },
            { paymentStatus: 'CANCELLED' }
          ]
        },
        include: {
          subscribe_package: {
            include: {
              zipCodes: true
            }
          },
          user: true
        }
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found or cannot be deleted (only pending, failed, or cancelled transactions can be deleted)');
      }

      // Use database transaction to ensure data consistency
      const result = await this.prisma.$transaction(async (prisma) => {
        // Delete the transaction first (to avoid foreign key constraint)
        await prisma.transaction.delete({
          where: { id: transactionId }
        });

        // Delete zip codes associated with the subscribe package
        if (transaction.subscribe_package?.zipCodes?.length > 0) {
          await prisma.zipCode.deleteMany({
            where: {
              subscribePackageId: transaction.subscribe_package.id
            }
          });
        }

        // Delete the subscribe package
        if (transaction.subscribe_package) {
          await prisma.subscribePackage.delete({
            where: { id: transaction.subscribe_package.id }
          });
        }

        // Check if user has any remaining active subscribe packages
        const remainingActivePackages = await prisma.subscribePackage.findMany({
          where: {
            userId: transaction.userId,
            status: 'ACTIVE'
          },
          include: {
            zipCodes: true,
            package: true

          }
        });

        // If no active packages remain, reset user fields
        if (remainingActivePackages.length === 0) {
          await prisma.user.update({
            where: { id: transaction.userId },
            data: {
              packageActive: 'NO',
              totalzipcodes: 0,
              addedzipcodes: 0
            }
          });
        } else {
          // Recalculate total zipcodes and added zipcodes based on remaining packages
          const totalZipcodes = remainingActivePackages.reduce((sum, pkg) => {
            return sum + (pkg.package?.profiles || 0);
          }, 0);
          
          const addedZipcodes = remainingActivePackages.reduce((sum, pkg) => {
            return sum + (pkg.zipCodes?.length || 0);
          }, 0);

          await prisma.user.update({
            where: { id: transaction.userId },
            data: {
              totalzipcodes: totalZipcodes,
              addedzipcodes: addedZipcodes
            }
          });
        }

        return {
          deletedTransaction: transaction,
          remainingActivePackages: remainingActivePackages.length
        };
      });

      return result;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete transaction and related records');
    }
  }

  async deleteTransaction(transactionId: number, userId: number) {
    try {
      // Find the transaction with all related data
      console.log("Hello")
      const transaction = await this.prisma.transaction.findFirst({
        where: {
          id: transactionId,
          userId: userId
        },
        include: {
          subscribe_package: {
            include: {
              zipCodes: true
            }
          }
        }
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found or access denied');
      }

      // Use database transaction to ensure data consistency
      const result = await this.prisma.$transaction(async (prisma) => {
        // Delete the transaction first (to avoid foreign key constraint)
        await prisma.transaction.delete({
          where: { id: transactionId }
        });

        // Delete zip codes associated with the subscribe package
        if (transaction.subscribe_package?.zipCodes?.length > 0) {
          await prisma.zipCode.deleteMany({
            where: {
              subscribePackageId: transaction.subscribe_package.id
            }
          });
        }

        // Delete the subscribe package
        if (transaction.subscribe_package) {
          await prisma.subscribePackage.delete({
            where: { id: transaction.subscribe_package.id }
          });
        }

        // Check if user has any remaining active subscribe packages
        const remainingActivePackages = await prisma.subscribePackage.findMany({
          where: {
            userId: userId,
            status: 'ACTIVE'
          },
          include: {
            zipCodes: true,
            package: true

          }
        });

        // If no active packages remain, reset user fields
        if (remainingActivePackages.length === 0) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              packageActive: 'NO',
              totalzipcodes: 0,
              addedzipcodes: 0
            }
          });
        } else {
          // Recalculate total zipcodes and added zipcodes based on remaining packages
          const totalZipcodes = remainingActivePackages.reduce((sum, pkg) => {
            return sum + (pkg.package?.profiles || 0);

          }, 0);
          
          const addedZipcodes = remainingActivePackages.reduce((sum, pkg) => {
            return sum + (pkg.zipCodes?.length || 0);
          }, 0);

          await prisma.user.update({
            where: { id: userId },
            data: {
              totalzipcodes: totalZipcodes,
              addedzipcodes: addedZipcodes
            }
          });
        }

        return {
          deletedTransaction: transaction,
          remainingActivePackages: remainingActivePackages.length
        };
      });

      return result;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete transaction and related records');
    }
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
          subscribe_package: {
            include: {
              zipCodes: true
            }
          }
        }
      });
  
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }
  
      // Check if subscription package exists
      if (!transaction.subscribe_package) {
        throw new NotFoundException('Subscription package not found');
      }
  
      // Use database transaction to ensure consistency
      await this.prisma.$transaction(async (prisma) => {
        // Update transaction status to cancelled
        await prisma.transaction.update({
          where: { id: transaction.id },
          data: { paymentStatus: 'CANCELLED' }
        });
  
        // Update subscription status to cancelled
        await prisma.subscribePackage.update({
          where: { id: transaction.subscribe_package.id },
          data: { status: 'CANCELLED' }
        });
  
        // Delete zip codes associated with this subscription package
        if (transaction.subscribe_package.zipCodes && transaction.subscribe_package.zipCodes.length > 0) {
          await prisma.zipCode.deleteMany({
            where: {
              subscribePackageId: transaction.subscribe_package.id
            }
          });
        }
  
        // Get user data
        const user = await prisma.user.findUnique({
          where: { id: transaction.userId }
        });
  
        if (!user) {
          throw new NotFoundException('User not found');
        }
  
        // Check if user has any remaining active subscribe packages
        const remainingActivePackages = await prisma.subscribePackage.findMany({
          where: {
            userId: transaction.userId,
            status: 'ACTIVE'
          },
          include: {
            zipCodes: true,
            package: true
          }
        });
  
        // If no active packages remain, reset user fields
        if (remainingActivePackages.length === 0) {
          await prisma.user.update({
            where: { id: transaction.userId },
            data: {
              packageActive: 'NO',
              totalzipcodes: 0,
              addedzipcodes: 0
            }
          });
        } else {
          // Recalculate total zipcodes and added zipcodes based on remaining packages
          const totalZipcodes = remainingActivePackages.reduce((sum, pkg) => {
            return sum + (pkg.package?.profiles || 0);
          }, 0);
          
          const addedZipcodes = remainingActivePackages.reduce((sum, pkg) => {
            return sum + (pkg.zipCodes?.length || 0);
          }, 0);
  
          await prisma.user.update({
            where: { id: transaction.userId },
            data: {
              totalzipcodes: totalZipcodes,
              addedzipcodes: addedZipcodes
            }
          });
        }
      });
  
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
