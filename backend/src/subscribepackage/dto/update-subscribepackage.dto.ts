import { PartialType } from '@nestjs/swagger';
import { CreateSubscribepackageDto } from './create-subscribepackage.dto';

export class UpdateSubscribepackageDto extends PartialType(CreateSubscribepackageDto) {}
