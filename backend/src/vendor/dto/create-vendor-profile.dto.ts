import { IsString, IsOptional } from 'class-validator';

export class CreateVendorProfileDto {
  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  zipcode?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  companyLogo?: string;
  @IsString()
  @IsOptional()
  fb?: string;
  @IsString()
  @IsOptional()
  ln?: string;
  @IsString()
  @IsOptional()
  in?: string;
  @IsString()
  @IsOptional()
  yt?: string;
}