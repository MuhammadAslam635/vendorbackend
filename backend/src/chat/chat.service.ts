import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ChatStatus, CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AddAdminDto } from './dto/add-admin.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async create(createChatDto: CreateChatDto) {
    try {
      const newChat = await this.prisma.chat.create({
        data: {
          ...createChatDto,
          status: createChatDto.status || ChatStatus.OPEN,
        }
      });
      return {
        status: 'success',
        message: 'Chat created successfully',
        data: newChat,
      };
    } catch (error) {
      console.error('Chat creation error:', error);
      throw new BadRequestException('Failed to create chat');
    }
  }

  async findAll(id: number) {
    try {
      if (!id || id <= 0) {
        throw new BadRequestException('Valid user ID is required');
      }

      const chats = await this.prisma.chat.findMany({
        where: {
          userId: id
        },
        include: {
          messages: {
            take: 1,
            orderBy: {
              createdAt: 'desc'
            }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        }
      });

      return {
        status: "success",
        message: "Retrieved all support tickets successfully",
        data: chats
      };
    } catch (error) {
      console.error('Find all chats error:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to retrieve chats');
    }
  }

  async findOne(id: number) {
    try {
      if (!id || id <= 0) {
        throw new BadRequestException('Valid chat ID is required');
      }

      const chat = await this.prisma.chat.findUnique({
        where: {
          id: id
        },
        include: {
          messages: {
            orderBy: {
              createdAt: 'asc'
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      if (!chat) {
        throw new NotFoundException('Chat not found');
      }

      return {
        status: "success",
        message: "Support chat retrieved successfully",
        data: chat
      };
    } catch (error) {
      console.error('Find one chat error:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to retrieve chat');
    }
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    try {
      if (!id || id <= 0) {
        throw new BadRequestException('Valid chat ID is required');
      }

      const existingChat = await this.prisma.chat.findUnique({
        where: { id }
      });

      if (!existingChat) {
        throw new NotFoundException('Chat not found');
      }

      const updatedChat = await this.prisma.chat.update({
        where: { id },
        data: updateChatDto,
        include: {
          messages: true,
        }
      });

      return {
        status: "success",
        message: "Chat updated successfully",
        data: updatedChat
      };
    } catch (error) {
      console.error('Update chat error:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to update chat');
    }
  }

  async remove(id: number) {
    try {
      if (!id || id <= 0) {
        throw new BadRequestException('Valid chat ID is required');
      }

      const existingChat = await this.prisma.chat.findUnique({
        where: { id }
      });

      if (!existingChat) {
        throw new NotFoundException('Chat not found');
      }

      const deletedChat = await this.prisma.chat.delete({
        where: { id },
        include: {
          messages: true
        }
      });

      return {
        status: "success",
        message: "Chat deleted successfully",
        data: deletedChat
      };
    } catch (error) {
      console.error('Delete chat error:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete chat');
    }
  }
  async assignAdmin(chatId:number,addAdminDeto:AddAdminDto){
    try{
      const chat = await this.prisma.chat.update({
        where:{
          id:chatId
        },
        data:{
          adminId: addAdminDeto.adminId
        }
      });
      return {
        status:"success",
        message:"Admin assigned successfully",
        data:chat
      }
    }catch(error){
      return {
        status:"error",
        message:error.message
      }
    }
  }
  async updateStatus(chatId:number, updateStatusDto:UpdateStatusDto){
    try{
      const chat = await this.prisma.chat.update({
        where:{
          id:chatId
        },
        data:{
          status:updateStatusDto.status
        }
      });
      return{
        status:"success",
        message:"Chat status updated successfully",
        data:chat
      }
    }catch(error){
      return {
        status:"error",
        message:error.message
      }
    }
  }
}