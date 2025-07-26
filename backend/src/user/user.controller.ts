import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, BadRequestException, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateStatusDto } from './dto/update-status.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly mailService: MailerService
  ) {
    // Create upload directories when controller is instantiated
    this.ensureUploadDirectoriesExist();
  }

  private ensureUploadDirectoriesExist() {
    const baseDir = path.join(process.cwd(), 'public', 'uploads');
    const logosDir = path.join(baseDir, 'logos');
    const profilesDir = path.join(baseDir, 'profiles');

    // Create directories if they don't exist
    [baseDir, logosDir, profilesDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  @Patch('/update')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'companyLogo', maxCount: 1 }
    ], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const baseDir = path.join(process.cwd(), 'public', 'uploads');
          const dest = file.fieldname === 'companyLogo' ? 
            path.join(baseDir, 'logos') : 
            path.join(baseDir, 'profiles');
          cb(null, dest);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
          const ext = path.extname(file.originalname || '');
          const prefix = file.fieldname === 'companyLogo' ? 'logo' : 'profile';
          cb(null, `${prefix}_${uniqueSuffix}${ext}`);
        }
      })
    })
  )
  @UseGuards(JwtAuthGuard) 
  async updateProfile(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles() files: { 
      companyLogo?: Express.Multer.File[]
    }
  ) {
    const companyLogo = files?.companyLogo?.[0];
    const backendUrl = this.configService.get<string>('BACKENDImg') || 'https://coreaeration.com/public';
    console.log(updateUserDto)
    return this.userService.updateProfile(
      updateUserDto,
      req.user.userId,
      companyLogo ? `${backendUrl}/uploads/logos/${companyLogo.filename}` : undefined
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const user = await this.userService.getUser(req.user.userId);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  @Get("/")
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto
  ) {
    return this.userService.updateStatus(+id, updateStatusDto.status);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(+id);
  }
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.getUser(+id);
  }
  @Get('/email/test-email')
  async testActivationEmail() {
    try {
      const user = await this.userService.getUser(2);
      return await this.mailService.sendMail({
        to: 'muhaffan945@gmail.com',
        subject: 'Test Activation Email',
        template: 'account-activation',
        context: {
          name: user.name || 'Valued Customer',
          loginUrl: `${process.env.FRONTEND_URL}/login`,
          packagesUrl: `${process.env.FRONTEND_URL}/packages`,
          supportEmail: process.env.SUPPORT_EMAIL || 'support@yourplatform.com'
        }
      });
    } catch (error) {
      console.error('Email error:', error);
      throw new BadRequestException('Failed to send test email');
    }
  }
  @Post('/admin/create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Patch('/admin/update-user:id')
  async updateUser(@Param('id') id:number, @Body() updateUserDto: UpdateAdminUserDto) {
    return this.userService.updateUser(+id,updateUserDto);
  }
  @Get("/all/admin-users")
  async adminUsers(){
    return this.userService.getAdminUsers();
  }
}