import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { SubscribepackageService } from './subscribepackage.service';
import { CreateSubscribepackageDto } from './dto/create-subscribepackage.dto';
import { UpdateSubscribepackageDto } from './dto/update-subscribepackage.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('subscribepackage')
export class SubscribepackageController {
  constructor(private readonly subscribepackageService: SubscribepackageService) {}

  @Post()
  create(@Body() createSubscribepackageDto: CreateSubscribepackageDto) {
    return this.subscribepackageService.create(createSubscribepackageDto);
  }

  @Get()
  findAll() {
    return this.subscribepackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscribepackageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscribepackageDto: UpdateSubscribepackageDto) {
    return this.subscribepackageService.update(+id, updateSubscribepackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscribepackageService.remove(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/my/pakcage')
  async getPackage(@Request() req){
  return this.subscribepackageService.getUserPackage(req.user.userId);
  }
}
