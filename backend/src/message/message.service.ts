import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto, MessageType } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) { }
  async create(createMessageDto: CreateMessageDto, userId: number) {
    try {
        // Validate required fields
        if (!createMessageDto.chatId || !createMessageDto.content) {
            throw new BadRequestException('Chat ID and content are required');
        }

        // Check if chat exists
        const chat = await this.prisma.chat.findUnique({
            where: { id: createMessageDto.chatId }
        });

        if (!chat) {
            throw new NotFoundException('Chat not found');
        }

        // Validate attachment URL if provided
        if (createMessageDto.attachments) {
            try {
                new URL(createMessageDto.attachments);
            } catch (error) {
                throw new BadRequestException('Invalid attachment URL format');
            }
        }

        const message = await this.prisma.message.create({
            data: {
                chatId: createMessageDto.chatId,
                userId: userId,
                content: createMessageDto.content,
                attachments: createMessageDto.attachments || null,
                messageBy: createMessageDto.messageBy || MessageType.USER as any,
                isRead: createMessageDto.isRead ?? false,
            },
            include: {
                chat: {
                    select: {
                        id: true,
                        title: true,
                        status: true
                    }
                }
            }
        });

        // Update chat's updatedAt timestamp
        await this.prisma.chat.update({
            where: { id: createMessageDto.chatId },
            data: { updatedAt: new Date() }
        });

        return {
            status: "success",
            message: "New message has been created.",
            data: message,
        };
    } catch (error) {
        console.error('Message creation error:', error);
        if (error instanceof BadRequestException || error instanceof NotFoundException) {
            throw error;
        }
        throw new BadRequestException('Failed to create message');
    }
}
  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
