import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsString()
  paymentMethod: string;

  @IsString()
  @IsOptional()
  paymentStatus?: string;

  @IsString()
  @IsOptional()
  transactionId?: string;

  @IsNumber()
  subscriptionId: number;

  @IsNumber()
  userId: number;
}