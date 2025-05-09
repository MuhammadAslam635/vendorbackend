import { 
  Controller, 
  Post, 
  Body, 
  UseInterceptors,
  UploadedFiles,
  Request,
  Get,
  UseGuards,
  Query,
  Param,
  Patch
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { VendorService } from './vendor.service';
import { UpdateVendorProfileDto } from './dto/update-vendor-profile.dto';
import {profileStorage, logoStorage} from '../config/storage.config'; // Adjust the import path as necessary
import { diskStorage } from 'multer';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { SearchVendorProfileDto } from './dto/search-vendor-profile.dto';
import { CreateVendorProfileDto } from './dto/create-vendor-profile.dto';
// Ensure this guard is applied to all routes in this controller
@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService,
    private configService: ConfigService
  ) {}
  @UseGuards(JwtAuthGuard) 
  @Post('profile/create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'companyLogo', maxCount: 1 }
    ], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Ensure paths are absolute
          const baseDir = path.join(process.cwd(), 'public', 'uploads');
          const dest = file.fieldname === 'companyLogo' ? 
            path.join(baseDir, 'logos') : 
            path.join(baseDir, 'profiles');
          cb(null, dest);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
          const ext = path.extname(file.originalname || ''); // Added fallback
          const prefix = file.fieldname === 'companyLogo' ? 'logo' : 'profile';
          cb(null, `${prefix}_${uniqueSuffix}${ext}`);
        }
      })
    })
  )
  @UseGuards(JwtAuthGuard) 
  async createProfile(
    @Request() req,
    @Body() createVendorProfileDto: CreateVendorProfileDto,
    @UploadedFiles() files: { 
      companyLogo?: Express.Multer.File[] 
    }
  ) {
    const companyLogo = files?.companyLogo?.[0];
    const backendUrl = this.configService.get<string>('BACKENDImg') || 'http://localhost:3000/public';
    return this.vendorService.createProfile(
      req.user.userId,
      createVendorProfileDto,
      companyLogo ? `${backendUrl}/uploads/logos/${companyLogo.filename}` : undefined
    );
  }
  @Patch('profile/update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'companyLogo', maxCount: 1 }
    ], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Ensure paths are absolute
          const baseDir = path.join(process.cwd(), 'public', 'uploads');
          const dest = file.fieldname === 'companyLogo' ? 
            path.join(baseDir, 'logos') : 
            path.join(baseDir, 'profiles');
          cb(null, dest);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
          const ext = path.extname(file.originalname || ''); // Added fallback
          const prefix = file.fieldname === 'companyLogo' ? 'logo' : 'profile';
          cb(null, `${prefix}_${uniqueSuffix}${ext}`);
        }
      })
    })
  )
  @UseGuards(JwtAuthGuard) 
  async updateProfile(
    @Request() req,
    @Body() updateVendorProfileDto: UpdateVendorProfileDto,@Param('id') id: string,
    @UploadedFiles() files: { 
      companyLogo?: Express.Multer.File[]
    }
  ) {
    const companyLogo = files?.companyLogo?.[0];
    const backendUrl = this.configService.get<string>('BACKENDImg') || 'http://localhost:3000/public';
    return this.vendorService.updateProfile(
      updateVendorProfileDto,
      id,
      companyLogo ? `${backendUrl}/uploads/logos/${companyLogo.filename}` : undefined
    );
  }
  @UseGuards(JwtAuthGuard) 
  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.vendorService.getProfile(id);
  }
  @UseGuards(JwtAuthGuard) 
  @Get('/profiles')
  async findOne(@Request() req) {
    console.log("User from JWT:", req.user);
    return this.vendorService.findByUserId(req.user.userId); // Changed from req.user.id to req.user.userId
  }
  @Get("/search")
  async searchVendors(@Query() searchDto: SearchVendorProfileDto) {
    return this.vendorService.searchVendors(searchDto);
  }
  @Get("/all")
  async getAllVendors() {
    return this.vendorService.getAllVendors();
  }
}