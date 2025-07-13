import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  city?: string;

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

  @IsString()
  @IsOptional()
  webUrl?: string;
}