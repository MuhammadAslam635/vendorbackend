import { IsString, IsNumber, IsOptional, Min, IsEnum } from 'class-validator';

export enum PackageStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class CreatePackageDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  duration: number;

  @IsEnum(PackageStatus)
  @IsOptional()
  status?: PackageStatus;
}