import { Injectable } from '@nestjs/common';
import { CreateSubscribepackageDto } from './dto/create-subscribepackage.dto';
import { UpdateSubscribepackageDto } from './dto/update-subscribepackage.dto';

@Injectable()
export class SubscribepackageService {
  create(createSubscribepackageDto: CreateSubscribepackageDto) {
    return 'This action adds a new subscribepackage';
  }

  findAll() {
    return `This action returns all subscribepackage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscribepackage`;
  }

  update(id: number, updateSubscribepackageDto: UpdateSubscribepackageDto) {
    return `This action updates a #${id} subscribepackage`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscribepackage`;
  }
}
