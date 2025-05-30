import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PackageZipcodeDto {
  @IsString()
  zipcode: string;
}

export class ZipcodeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackageZipcodeDto)
  zipcodes: PackageZipcodeDto[];
}