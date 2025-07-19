import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PromoService } from './promo.service';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';

@ApiTags('Promos')
@Controller('promos')

@ApiBearerAuth()
export class PromoController {
  constructor(private readonly promoService: PromoService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new promo' })
  @ApiResponse({ status: 201, description: 'Promo created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Promo code already exists' })
  async create(@Body() createPromoDto: CreatePromoDto, @Request() req) {
    return this.promoService.create(createPromoDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all promos with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Promos retrieved successfully' })
  async findAll() {
    return this.promoService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active promos' })
  @ApiResponse({ status: 200, description: 'Active promos retrieved successfully' })
  async getActivePromos() {
    return this.promoService.getActivePromos();
  }
  @UseGuards(JwtAuthGuard)
  @Get('validate/:code')
  @ApiOperation({ summary: 'Validate promo code' })
  @ApiResponse({ status: 200, description: 'Promo code is valid' })
  @ApiResponse({ status: 400, description: 'Invalid or expired promo code' })
  @ApiResponse({ status: 404, description: 'Promo code not found' })
  async validatePromoCode(
    @Param('code') code: string,
  ) {
    return this.promoService.validatePromoCode(code);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get promo by ID' })
  @ApiResponse({ status: 200, description: 'Promo retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Promo not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.promoService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update promo' })
  @ApiResponse({ status: 200, description: 'Promo updated successfully' })
  @ApiResponse({ status: 404, description: 'Promo not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePromoDto: UpdatePromoDto,
  ) {
    return this.promoService.update(id, updatePromoDto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id/toggle-status')
  @ApiOperation({ summary: 'Toggle promo status' })
  @ApiResponse({ status: 200, description: 'Promo status toggled successfully' })
  @ApiResponse({ status: 404, description: 'Promo not found' })
  async toggleStatus(@Param('id', ParseIntPipe) id: number) {
    return this.promoService.toggleStatus(id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete promo' })
  @ApiResponse({ status: 204, description: 'Promo deleted successfully' })
  @ApiResponse({ status: 404, description: 'Promo not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.promoService.remove(id);
  }
}

// Additional controller for vendor-specific operations
@ApiTags('Vendor Promos')
@Controller('vendor/promos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VendorPromoController {
  constructor(private readonly promoService: PromoService) {}

  @Get()
  @ApiOperation({ summary: 'Get vendor-specific promos' })
  @ApiResponse({ status: 200, description: 'Vendor promos retrieved successfully' })
  async getVendorPromos(@Request() req) {
    return this.promoService.findAll();
  }

  @Get('available')
  @ApiOperation({ summary: 'Get available promos for vendor' })
  @ApiResponse({ status: 200, description: 'Available promos retrieved successfully' })
  async getAvailablePromos(@Request() req) {
    
    return this.promoService.findAll();
  }
}