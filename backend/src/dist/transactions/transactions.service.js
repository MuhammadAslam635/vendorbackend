"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let TransactionsService = class TransactionsService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    create(createTransactionDto) {
        return 'This action adds a new transaction';
    }
    async findAll() {
        return this.prisma.transaction.findMany();
    }
    async myAllT(userId) {
        console.log("object transactions", userId);
        return this.prisma.transaction.findMany({ where: { userId: userId },
            include: {
                subscribe_package: true,
                user: true
            }
        });
    }
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        }
        return transaction;
    }
    update(id, updateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }
    async createPaymentSession(userId, packageId) {
        try {
            const pack = await this.prisma.package.findUnique({
                where: { id: packageId }
            });
            if (!pack) {
                throw new common_1.BadRequestException('Package not found');
            }
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
                            totalProfiles: {
                                increment: pack?.profiles
                            },
                            packageActive: 'YES'
                        }
                    });
                }
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
            const quickPayApiKey = this.configService.get('QUICKPAY_API_KEY');
            const apiUrl = this.configService.get('API_URL');
            const FRONTEND_URL = this.configService.get('FRONTEND_URL');
            const paymentWindowKey = this.configService.get('PAYMENT_WINDOW_KEY');
            if (!quickPayApiKey || !apiUrl || !paymentWindowKey) {
                throw new common_1.InternalServerErrorException('Payment configuration missing');
            }
            const paymentResponse = await axios_1.default.post('https://api.quickpay.net/payments', {
                order_id: `SUB-${subscription.sub.id}`,
                currency: 'USD',
            }, {
                headers: {
                    'Accept-Version': 'v10',
                    'Authorization': `Basic ${Buffer.from(`:${quickPayApiKey}`).toString('base64')}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Payment creation response:', paymentResponse.data);
            const merchantId = this.configService.get('QUICKPAY_MERCHANT_ID');
            const agreementId = this.configService.get('QUICKPAY_AGREEMENT_ID');
            const apiKey = this.configService.get('QUICKPAY_API_KEY');
            const privateKey = this.configService.get('QUICKPAY_PRIVATE_KEY');
            const agreementKey = this.configService.get('QUICKPAY_AGREEMENT_KEY');
            const paymentId = paymentResponse.data.id;
            const linkResponse = await axios_1.default.put(`https://api.quickpay.net/payments/${paymentId}/link`, {
                merchant_id: merchantId,
                amount: Math.round(pack.price * 100),
                continue_url: `${FRONTEND_URL}/transactions/payment-success`,
                cancel_url: `${FRONTEND_URL}/transactions/payment-cancel`,
                callback_url: `${apiUrl}/transactions/webhook`,
                auto_capture: true,
                language: 'en',
                payment_methods: 'creditcard',
                framed: false
            }, {
                headers: {
                    'Accept-Version': 'v10',
                    'Authorization': `Basic ${Buffer.from(`:${quickPayApiKey}`).toString('base64')}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Payment link response:', linkResponse.data);
            await this.prisma.transaction.update({
                where: { id: subscription.transaction.id },
                data: {
                    transactionId: paymentId.toString()
                }
            });
            return {
                paymentUrl: linkResponse.data.url,
                transactionId: subscription.transaction.id,
                orderId: `SUB-${subscription.sub.id}`
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            console.error('Payment session creation failed:', error);
            throw new common_1.InternalServerErrorException('Failed to create payment session');
        }
    }
    async verifyWebhookSignature(payload, signature) {
        try {
            const privateKey = this.configService.get('QUICKPAY_PRIVATE_KEY');
            if (!privateKey) {
                console.error('Private key not configured');
                return false;
            }
            const crypto = require('crypto');
            const payloadString = JSON.stringify(payload);
            const calculatedSignature = crypto
                .createHmac('sha256', privateKey)
                .update(payloadString)
                .digest('hex');
            return calculatedSignature === signature;
        }
        catch (error) {
            console.error('Signature verification failed:', error);
            return false;
        }
    }
    async handleWebhook(payload) {
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
                    throw new common_1.BadRequestException('Subscription not found');
                }
                const transaction = subscription.transaction;
                await prisma.transaction.update({
                    where: { id: transaction?.id },
                    data: {
                        paymentStatus: payload.status,
                        transactionId: payload.transactionId?.toString()
                    },
                });
                console.log('Transaction status updated');
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
                    return this.redirect(FRONTEND_URL + '/vendor/dashboard/subscription?success=true');
                }
                else if (payload.status === 'CANCELLED' || payload.status === 'FAILED') {
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
        }
        catch (error) {
            console.error('Webhook processing error:', error);
            return this.redirect(FRONTEND_URL + '/vendor/dashboard/subscription?error=system_error');
        }
    }
    async confirmPaymentSuccess(orderId) {
        const FRONTEND_URL = this.configService.get('FRONTEND_URL');
        return this.redirect(FRONTEND_URL + '/vendor/dashboard/subscription');
    }
    async handlePaymentCancel(orderId) {
        const FRONTEND_URL = this.configService.get('FRONTEND_URL');
        return this.redirect(FRONTEND_URL + '/vendor/dashboard/subscription?canceled=true');
    }
    redirect(url) {
        return {
            statusCode: 302,
            headers: { Location: url },
            body: null
        };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map