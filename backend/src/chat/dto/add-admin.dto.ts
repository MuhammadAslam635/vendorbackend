import { IsNumber } from "class-validator";


export class AddAdminDto {
    @IsNumber()
    adminId: number

}
