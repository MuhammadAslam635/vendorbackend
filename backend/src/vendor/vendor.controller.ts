import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GenerateBadgeDto } from './dto/generate-badge.dto';

@ApiTags('Vendor')
@Controller('vendor')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get('badge/script')
  @ApiOperation({ summary: 'Generate certification badge widget script for vendor' })
  @ApiResponse({ status: 200, description: 'Badge script generated successfully' })
  async generateBadgeScript(@Request() req) {
    console.log('Badge script endpoint hit by user:', req.user);
    const vendorId = req.user.userId;
    console.log('Calling generateBadgeScript with vendorId:', vendorId);
    const result = await this.vendorService.generateBadgeScript(vendorId);
    console.log('Controller returning result:', result);
    return result;
  }

  @Post('badge/customize')
  @ApiOperation({ summary: 'Customize badge widget settings' })
  @ApiResponse({ status: 200, description: 'Badge customization saved successfully' })
  async customizeBadge(@Request() req, @Body() customizeDto: GenerateBadgeDto) {
    const vendorId = req.user.userId;
    return this.vendorService.customizeBadge(vendorId, customizeDto);
  }
}