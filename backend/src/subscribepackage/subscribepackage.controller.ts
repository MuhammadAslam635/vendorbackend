import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { SubscribepackageService } from './subscribepackage.service';
import { CreateSubscribepackageDto } from './dto/create-subscribepackage.dto';
import { UpdateSubscribepackageDto } from './dto/update-subscribepackage.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('subscribepackage')
export class SubscribepackageController {
  constructor(private readonly subscribepackageService: SubscribepackageService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/my/pakcage')
  async getPackage(@Request() req){
  return this.subscribepackageService.getUserPackage(req.user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get("/my/all/packages")
  async gteAllPackages(@Request() req){
    return this.subscribepackageService.getUserAllPackages(req.user.userId);
  }
}
