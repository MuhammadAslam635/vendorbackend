import { 
  Controller, 
  Post, 
  Body, 
  UseInterceptors,
  UploadedFiles,
  Request,
  Get,
  UseGuards,
  Query
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { VendorService } from './vendor.service';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import {profileStorage, logoStorage} from '../config/storage.config'; // Adjust the import path as necessary
import { diskStorage } from 'multer';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { SearchVendorDto } from './dto/search-vendor.dto';
// Ensure this guard is applied to all routes in this controller
@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService,
    private configService: ConfigService
  ) {}
  @UseGuards(JwtAuthGuard) 
  @Post('profile')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profileImg', maxCount: 1 },
      { name: 'companyLogo', maxCount: 1 }
    ], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Ensure paths are absolute
          const baseDir = path.join(process.cwd(), 'public', 'uploads');
          const dest = file.fieldname === 'profileImg' ? 
            path.join(baseDir, 'profiles') : 
            path.join(baseDir, 'logos');
          cb(null, dest);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
          const ext = path.extname(file.originalname || ''); // Added fallback
          const prefix = file.fieldname === 'profileImg' ? 'profile' : 'logo';
          cb(null, `${prefix}_${uniqueSuffix}${ext}`);
        }
      })
    })
  )
  @UseGuards(JwtAuthGuard) 
  async updateProfile(
    @Request() req,
    @Body() updateVendorDto: UpdateVendorDto,
    @UploadedFiles() files: { 
      profileImg?: Express.Multer.File[], 
      companyLogo?: Express.Multer.File[] 
    }
  ) {
    const profileImg = files?.profileImg?.[0];
    const companyLogo = files?.companyLogo?.[0];
    const backendUrl = this.configService.get<string>('BACKENDImg') || 'http://localhost:3000/public';
    return this.vendorService.updateOrCreate(
      req.user.userId,
      updateVendorDto,
      profileImg ? `${backendUrl}/uploads/profiles/${profileImg.filename}` : undefined,
      companyLogo ? `${backendUrl}/uploads/logos/${companyLogo.filename}` : undefined
    );
  }
  @UseGuards(JwtAuthGuard) 
  @Get('profile')
  async findOne(@Request() req) {
    console.log("User from JWT:", req.user);
    return this.vendorService.findByUserId(req.user.userId); // Changed from req.user.id to req.user.userId
  }
  @Get("search")
  async searchVendors(@Query() searchDto: SearchVendorDto) {
    return this.vendorService.searchVendors(searchDto);
  }
  @Get("all")
  async getAllVendors() {
    return this.vendorService.getAllVendors();
  }
}