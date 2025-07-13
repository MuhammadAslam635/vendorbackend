import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsEnum, IsDateString, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';


export class CreatePromoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  maxZipCode?: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean = true;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isSiteWide?: boolean = false;
  @IsNotEmpty()
  createdBy: number
}



export class PromoResponseDto {
  id: number;
  title: string;
  description?: string;
  code: string;
  maxZipCode?: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isSiteWide: boolean
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
  creator?: {
    id: number;
    name: string;
    email: string;
  };
}