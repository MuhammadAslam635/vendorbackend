import { IsEnum, IsNumber, IsString } from "class-validator";
enum ChatStatus {
    OPEN = 'OPEN',
    INPROGRESS = 'INPROGRESS',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED',
}
export class CreateChatDto {
    @IsNumber()
    userId: number
    @IsString()
    title: string
    @IsEnum(ChatStatus)
    status: ChatStatus
}
export{ ChatStatus}