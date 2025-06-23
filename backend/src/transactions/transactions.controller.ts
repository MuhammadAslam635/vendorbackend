import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException, Headers, HttpCode, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ZipcodeDto } from 'src/zipcode/dto/package-create-zipcode.dto';
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.transactionsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('my/all')
  myAll(@Request() req) {
    return this.transactionsService.myAllT(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transactionId = parseInt(id);
    if (isNaN(transactionId)) {
      throw new BadRequestException('Invalid transaction ID');
    }
    return this.transactionsService.findOne(transactionId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('create-session/:packageId')
  async createPaymentSession(
    @Param('packageId') packageId: string,
    @Request() req,
    @Body() createZipcodeDto: ZipcodeDto  // Update this line
  ) {
    if (!packageId) {
      throw new BadRequestException('Package ID is required');
    }
    
    // Validate zipcodes array
    if (!createZipcodeDto.zipcodes || !Array.isArray(createZipcodeDto.zipcodes)) {
      throw new BadRequestException('Invalid zipcodes format');
    }
  
    return this.transactionsService.createPaymentSession(
      req.user.userId, 
      +packageId, 
      createZipcodeDto
    );
  }
// New endpoint to capture PayPal payment after user approval
@UseGuards(JwtAuthGuard)
@Post('capture-paypal/:paypalOrderId')
async capturePayPalPayment(
  @Param('paypalOrderId') paypalOrderId: string,
  @Request() req
) {
  if (!paypalOrderId) {
    throw new BadRequestException('PayPal Order ID is required');
  }

  try {
    const result = await this.transactionsService.capturePayPalPayment(paypalOrderId);
    
    return {
      status: 'success',
      message: 'Payment captured successfully',
      data: result
    };
  } catch (error) {
    console.error('Payment capture failed:', error);
    throw new BadRequestException('Failed to capture payment');
  }
}

// PayPal webhook endpoint (replaces QuickPay webhook)
@Post('webhook/paypal')
@HttpCode(200)
async handlePayPalWebhook(
  @Headers() headers: any,
  @Body() payload: any
) {
  try {
    console.log('Received PayPal webhook:', {
      eventType: payload.event_type,
      resourceId: payload.resource?.id,
      headers: {
        'paypal-transmission-id': headers['paypal-transmission-id'],
        'paypal-cert-id': headers['paypal-cert-id'],
        'paypal-auth-algo': headers['paypal-auth-algo']
      }
    });

    // Process the PayPal webhook
    await this.transactionsService.handlePayPalWebhook(payload, headers);

    // PayPal expects a 200 response
    return { 
      status: 'success',
      message: 'Webhook processed successfully'
    };
  } catch (error) {
    console.error('PayPal webhook processing error:', error);
    // Still return 200 to acknowledge receipt
    return { 
      status: 'received',
      message: 'Webhook received with errors'
    };
  }
}

// Optional: Endpoint to handle payment success redirect
@Get('payment-success')
async handlePaymentSuccess(
  @Query('token') paypalOrderId: string,
  @Query('PayerID') payerId: string,
  @Query('transactionId') transactionId?: string
) {
  try {
    if (!paypalOrderId) {
      throw new BadRequestException('PayPal Order ID is required');
    }

    // Capture the payment
    const result = await this.transactionsService.capturePayPalPayment(paypalOrderId);
    
    return {
      status: 'success',
      message: 'Payment completed successfully',
      paypalOrderId,
      payerId,
      transactionId,
      captureResult: result
    };
  } catch (error) {
    console.error('Payment success handling failed:', error);
    return {
      status: 'error',
      message: 'Payment processing failed',
      error: error.message
    };
  }
}

// Optional: Endpoint to handle payment cancellation
@Get('payment-cancel')
async handlePaymentCancel(
  @Query('token') paypalOrderId: string,
  @Query('transactionId') transactionId?: string
) {
  try {
    console.log('Payment cancelled:', { paypalOrderId, transactionId });

    // Update transaction status to cancelled if we have the transaction ID
    if (transactionId) {
      await this.transactionsService.updateTransactionStatus(
        parseInt(transactionId), 
        'CANCELLED'
      );
    }

    return {
      status: 'cancelled',
      message: 'Payment was cancelled by user',
      paypalOrderId,
      transactionId
    };
  } catch (error) {
    console.error('Payment cancel handling failed:', error);
    return {
      status: 'error',
      message: 'Error handling payment cancellation',
      error: error.message
    };
  }
}

// Optional: Get payment status endpoint
@UseGuards(JwtAuthGuard)
@Get('status/:transactionId')
async getPaymentStatus(
  @Param('transactionId') transactionId: string,
  @Request() req
) {
  if (!transactionId) {
    throw new BadRequestException('Transaction ID is required');
  }

  try {
    const transaction = await this.transactionsService.getTransactionStatus(
      parseInt(transactionId),
      req.user.userId
    );

    return {
      status: 'success',
      data: transaction
    };
  } catch (error) {
    console.error('Failed to get payment status:', error);
    throw new BadRequestException('Failed to get payment status');
  }
}

  // @Get('payment-success')
  // async handlePaymentSuccess(@Request() req) {
  //   const orderId = req.query.order_id;
    
  //   if (!orderId) {
  //     throw new BadRequestException('Order ID is required');
  //   }
    
  //   const result = await this.transactionsService.confirmPaymentSuccess(orderId);
    
  //   // Redirect to the dashboard with success message
  //   return result;
  // }

  // @Get('payment-cancel')
  // async handlePaymentCancel(@Request() req) {
  //   const orderId = req.query.order_id;
    
  //   if (!orderId) {
  //     throw new BadRequestException('Order ID is required');
  //   }
    
  //   const result = await this.transactionsService.handlePaymentCancel(orderId);
    
  //   // Redirect back to the subscription page
  //   return result;
  // }

  // Helper method to map QuickPay status to your application's status format
  private mapQuickPayStatus(accepted: boolean): string {
    return accepted ? 'COMPLETED' : 'FAILED';
  }
}
