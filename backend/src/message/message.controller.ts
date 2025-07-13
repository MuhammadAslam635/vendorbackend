import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@UseGuards(JwtAuthGuard)
@Controller('message')

export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  create(@Request() request, @Body() createMessageDto: CreateMessageDto) {
    const userId = request.user.userId;
    console.log("message Dto", createMessageDto)
    return this.messageService.create(createMessageDto, userId);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/attachments',
      filename: (req, file, cb) => {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      // Allow all file types but you can add restrictions here
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain', 'text/csv',
        'application/zip', 'application/x-rar-compressed'
      ];

      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new BadRequestException('File type not allowed'), false);
      }
    },
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Return the file URL
    const fileUrl = `${process.env.APP_URL || 'http://localhost:3000'}/uploads/attachments/${file.filename}`;

    return {
      status: 'success',
      message: 'File uploaded successfully',
      data: {
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        url: fileUrl,
        fileUrl: fileUrl // For compatibility
      }
    };
  }
}
