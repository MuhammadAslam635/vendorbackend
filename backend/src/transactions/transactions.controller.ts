import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException, Headers, HttpCode } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }
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
    @Request() req
  ) {
    if (!packageId) {
      throw new BadRequestException('Package ID is required');
    }
    return this.transactionsService.createPaymentSession(req.user.userId, +packageId);
  }

  @Post('webhook/quickpay')
  @HttpCode(200)
  async handleWebhook(
    @Headers('quickpay-checksum-sha256') signature: string,
    @Body() payload: any
  ) {
    try {
      console.log('Received QuickPay webhook:', {
        payload,
        signature
      });

      // Map QuickPay status to our status
      const status = payload.accepted ? 'COMPLETED' : 'FAILED';
      
      // Extract order ID (remove 'SUB' prefix)
      const orderId = payload.order_id;
      
      const webhookPayload = {
        orderId,
        status,
        transactionId: payload.id,
        amount: payload.operations?.[0]?.amount || payload.basket?.[0]?.item_price,
        currency: payload.currency
      };

      console.log('Mapped webhook payload:', webhookPayload);

      // Process the webhook
      await this.transactionsService.handleWebhook(webhookPayload);

      // QuickPay expects a 200 response
      return { 
        status: 'success',
        message: 'Webhook processed successfully'
      };
    } catch (error) {
      console.error('Webhook processing error:', error);
      // Still return 200 to acknowledge receipt
      return { 
        status: 'received',
        message: 'Webhook received with errors'
      };
    }
  }

  @Get('payment-success')
  async handlePaymentSuccess(@Request() req) {
    const orderId = req.query.order_id;
    
    if (!orderId) {
      throw new BadRequestException('Order ID is required');
    }
    
    const result = await this.transactionsService.confirmPaymentSuccess(orderId);
    
    // Redirect to the dashboard with success message
    return result;
  }

  @Get('payment-cancel')
  async handlePaymentCancel(@Request() req) {
    const orderId = req.query.order_id;
    
    if (!orderId) {
      throw new BadRequestException('Order ID is required');
    }
    
    const result = await this.transactionsService.handlePaymentCancel(orderId);
    
    // Redirect back to the subscription page
    return result;
  }

  // Helper method to map QuickPay status to your application's status format
  private mapQuickPayStatus(accepted: boolean): string {
    return accepted ? 'COMPLETED' : 'FAILED';
  }
}
