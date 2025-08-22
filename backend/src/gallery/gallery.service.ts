import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import * as fs from 'fs/promises';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GalleryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {
    this.initializeUploadDirectories();
  }

  private readonly uploadDir = join(process.cwd(), 'public', 'uploads');

  private async initializeUploadDirectories() {
    try {
      await fs.mkdir(join(this.uploadDir, 'gallery'), { recursive: true });
      console.log('Upload directories created at:', this.uploadDir);
    } catch (error) {
      console.error('Failed to create upload directories:', error);
    }
  }

  private async saveFile(file: Express.Multer.File, subFolder: string): Promise<string> {
    console.log('saveFile called with:', {
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.buffer?.length,
      subFolder
    });

    try {
      if (!file?.buffer) {
        console.error('No file buffer found for:', file.originalname);
        throw new BadRequestException('No file buffer found');
      }

      // Get file extension from mimetype
      const mimeToExt = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/webp': '.webp'
      };
      const ext = mimeToExt[file.mimetype] || '.jpg';

      // Create unique filename with proper extension
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`;
      const folderPath = join(this.uploadDir, subFolder);
      const filePath = join(folderPath, uniqueName);
      console.log("object file", uniqueName)
      console.log("object folder path", folderPath)
      console.log("object path", filePath)

      // Ensure directory exists
      await fs.mkdir(folderPath, { recursive: true });

      // Write file with buffer
      await fs.writeFile(filePath, file.buffer);

      // Verify file was written
      const stats = await fs.stat(filePath);
      console.log(`File saved successfully: ${filePath} (${stats.size} bytes)`);
      const backendUrl = this.configService.get<string>('BACKEND_URL') || 'http://localhost:3000';
      return `${backendUrl}/public/uploads/${subFolder}/${uniqueName}`;
    } catch (error) {
      console.error('File save error:', error);
      throw new BadRequestException(`Failed to save file: ${error.message}`);
    }
  }

  async uploadImages(files: Express.Multer.File[], userId: number) {
    try {
      // First verify that the user exists
      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new BadRequestException(`User with ID ${userId} not found`);
      }

      console.log('Uploading images for user:', userId);
      const backendUrl = this.configService.get<string>('BACKENDImg');
      
      // Create an array of gallery entries
      const galleryEntries = files.map(file => {
        const backendUrl = this.configService.get<string>('BACKEND_URL') || 'http://localhost:3000';
        const entry = {
          image: `${backendUrl}/public/uploads/gallery/${file.filename}`,
          userId: user.id // Use the verified user.id
        };
        console.log('Creating gallery entry:', entry);
        return entry;
      });

      // Create all gallery entries at once
      const result = await this.prisma.gallery.createMany({
        data: galleryEntries,
        skipDuplicates: true // Optional: skip if duplicate entries exist
      });

      console.log('Gallery entries created:', result);
      return result;

    } catch (error) {
      console.error('Upload error details:', {
        error: error.message,
        code: error.code,
        meta: error.meta,
        userId: userId
      });

      // Clean up uploaded files if database operation fails
      await Promise.all(files.map(file => 
        fs.unlink(join(process.cwd(), 'public', 'uploads', 'gallery', file.filename))
          .catch(err => console.error(`Failed to delete file ${file.filename}:`, err))
      ));

      if (error.code === 'P2003') {
        throw new BadRequestException(`Invalid user ID: ${userId}. Please make sure you're logged in.`);
      }
      throw new BadRequestException(`Failed to upload images: ${error.message}`);
    }
  }

  async getGallery(userId: number) {
    return this.prisma.gallery.findMany({ 
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async deleteImage(id: string) {
    try {
      const image = await this.prisma.gallery.findUnique({
        where: { id: parseInt(id) }
      });

      if (!image || !image.image) {
        throw new NotFoundException('Image not found or image path is invalid');
      }

      // Extract filename from the URL or path
      const urlParts = image.image.split('/');
      const filename = urlParts[urlParts.length - 1]; // Get the last part of the URL

      if (!filename) {
        throw new BadRequestException('Invalid image path');
      }

      // Set path to just the gallery folder
      const imagePath = join('public', 'uploads', 'gallery', filename);
      console.log('Attempting to delete file:', imagePath);

      try {
        // Delete the file from the gallery folder
        await fs.unlink(imagePath);
        console.log(`File deleted successfully: ${filename}`);
      } catch (error) {
        console.error(`Error deleting file: ${filename}`, error);
        // Continue with database deletion even if file deletion fails
      }

      // Delete the database record
      return await this.prisma.gallery.delete({
        where: { id: parseInt(id) }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete image: ${error.message}`);
    }
  }
}