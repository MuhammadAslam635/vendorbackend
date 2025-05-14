import { IsOptional, IsString, Matches } from "class-validator";

export class SearchZipcodeDto {
  @IsString()
  zipcode?: string;
}

