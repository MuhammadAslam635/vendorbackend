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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const update_transaction_dto_1 = require("./dto/update-transaction.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let TransactionsController = class TransactionsController {
    transactionsService;
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    create(createTransactionDto) {
        return this.transactionsService.create(createTransactionDto);
    }
    findAll() {
        return this.transactionsService.findAll();
    }
    myAll(req) {
        return this.transactionsService.myAllT(req.user.userId);
    }
    async findOne(id) {
        const transactionId = parseInt(id);
        if (isNaN(transactionId)) {
            throw new common_1.BadRequestException('Invalid transaction ID');
        }
        return this.transactionsService.findOne(transactionId);
    }
    update(id, updateTransactionDto) {
        return this.transactionsService.update(+id, updateTransactionDto);
    }
    async createPaymentSession(packageId, req) {
        if (!packageId) {
            throw new common_1.BadRequestException('Package ID is required');
        }
        return this.transactionsService.createPaymentSession(req.user.userId, +packageId);
    }
    async handleWebhook(payload, signature) {
        if (!payload) {
            throw new common_1.BadRequestException('Webhook payload is required');
        }
        const isValid = await this.transactionsService.verifyWebhookSignature(payload, signature);
        if (!isValid) {
            throw new common_1.BadRequestException('Invalid webhook signature');
        }
        return this.transactionsService.handleWebhook({
            orderId: payload.order_id,
            status: this.mapQuickPayStatus(payload.accepted),
            transactionId: payload.id,
            amount: payload.amount
        });
    }
    async handlePaymentSuccess(req) {
        const orderId = req.query.order_id;
        if (!orderId) {
            throw new common_1.BadRequestException('Order ID is required');
        }
        const result = await this.transactionsService.confirmPaymentSuccess(orderId);
        return result;
    }
    async handlePaymentCancel(req) {
        const orderId = req.query.order_id;
        if (!orderId) {
            throw new common_1.BadRequestException('Order ID is required');
        }
        const result = await this.transactionsService.handlePaymentCancel(orderId);
        return result;
    }
    mapQuickPayStatus(accepted) {
        return accepted ? 'COMPLETED' : 'FAILED';
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my/all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "myAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_transaction_dto_1.UpdateTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create-session/:packageId'),
    __param(0, (0, common_1.Param)('packageId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "createPaymentSession", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('QuickPay-Checksum-Sha256')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "handleWebhook", null);
__decorate([
    (0, common_1.Get)('payment-success'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "handlePaymentSuccess", null);
__decorate([
    (0, common_1.Get)('payment-cancel'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "handlePaymentCancel", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map