import { IsBoolean, IsEnum, IsNumber, IsString, IsOptional } from "class-validator";

enum MessageType {
    USER = "USER",
    ADMIN = "ADMIN",
    SUBADMIN = "SUBADMIN"
}

export class CreateMessageDto {
    @IsNumber()
    chatId: number;

    @IsNumber()
    userId: number;

    @IsString()
    content: string;
    @IsString()
    attachments: string;

    @IsEnum(MessageType)
    @IsOptional()
    messageBy?: MessageType;

    @IsBoolean()
    @IsOptional()
    isRead?: boolean = false;
}

export { MessageType };