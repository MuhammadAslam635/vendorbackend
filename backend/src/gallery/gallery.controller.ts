import { Controller, Post, UseInterceptors, UploadedFiles, UseGuards, Request, Get, BadRequestException, Delete, Param } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly galleryService: GalleryService,
    private readonly configService: ConfigService,
  ) {
    this.ensureUploadDirectoriesExist();
  }
  
  private ensureUploadDirectoriesExist() {
    const baseDir = path.join(process.cwd(), 'public', 'uploads');
    const galleryDir = path.join(baseDir, 'gallery');

    [baseDir, galleryDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 10 }
    ], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const baseDir = path.join(process.cwd(), 'public', 'uploads');
          const dest = path.join(baseDir, 'gallery');  
          cb(null, dest);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
          const ext = path.extname(file.originalname || '');
          cb(null, `gallery_${uniqueSuffix}${ext}`);
        }
      })
    })
  )
  async uploadImages(
    @UploadedFiles() files: { images?: Express.Multer.File[] }, 
    @Request() req
  ) {
    console.log(files,req.user.userId);
    if (!files.images || files.images.length === 0) {
      throw new BadRequestException('No images uploaded');
    }

    return this.galleryService.uploadImages(files.images, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/all')
  getGallery(@Request() req) {
    return this.galleryService.getGallery(req.user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    return this.galleryService.deleteImage(id);
  }
}
