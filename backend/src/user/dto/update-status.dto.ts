import { IsString, IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsString()
  @IsIn(['PENDING', 'ACTIVE', 'SUSPENDED'])
  status: string;
}