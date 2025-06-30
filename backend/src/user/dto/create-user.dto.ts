import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    phone: string;
    @IsString()
    password: string;
    @IsString()
    utype: string;
    @IsString()
    status: string;
}
