import { IsEnum } from "class-validator";
import { ChatStatus } from "./create-chat.dto";

export class UpdateStatusDto {
    @IsEnum(ChatStatus)
    status: ChatStatus
    
}