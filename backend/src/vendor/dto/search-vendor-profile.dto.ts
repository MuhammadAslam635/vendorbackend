import { IsString, IsOptional } from 'class-validator';

export class SearchVendorProfileDto {
  @IsString()
  @IsOptional()
  search?: string;
}