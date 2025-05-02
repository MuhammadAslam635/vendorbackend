import { IsString, IsOptional } from 'class-validator';

export class SearchVendorDto {
  @IsString()
  @IsOptional()
  search?: string;
}