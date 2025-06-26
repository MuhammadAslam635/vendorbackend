import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException, Headers, HttpCode, Query, InternalServerErrorException } from '@nestjs/common';
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
@Post('payment-success')
async handlePaymentSuccess(
  @Body('transactionId') transactionId?: string
) {
  try {
    if (!transactionId) {
      throw new BadRequestException('Transaction ID is required');
    }

    // Call service function to handle payment success
    const result = await this.transactionsService.confirmPaymentSuccess(
      transactionId
    );
    
    return {
      status: 'success',
      message: 'Payment completed successfully',
      data: result
    };
  } catch (error) {
    console.error('Payment success handling failed:', error);
    
    // Re-throw known exceptions
    if (error instanceof BadRequestException ||  
        error instanceof InternalServerErrorException) {
      throw error;
    }
    
    throw new InternalServerErrorException('Payment processing failed');
  }
}

@Post('payment-cancel')
async handlePaymentCancel(
  @Body('transactionId') transactionId?: string
) {
  try {
    if (!transactionId) {
      throw new BadRequestException('Transaction ID is required');
    }

    console.log('Payment cancelled:', {  transactionId });

    // Call service function to handle payment cancellation
    const result = await this.transactionsService.handlePaymentCancel(transactionId);

    return {
      status: 'cancelled',
      message: 'Payment was cancelled successfully',
      data: result
    };
  } catch (error) {
    console.error('Payment cancel handling failed:', error);
    
    // Re-throw known exceptions
    if (error instanceof BadRequestException) {
      throw error;
    }
    
    throw new InternalServerErrorException('Error handling payment cancellation');
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
