import { IsNumber, IsString } from "class-validator";

import { IsNotEmpty } from "class-validator";

export class CreateZipcodeDto {
    @IsNotEmpty()
    @IsString()
    zipcode: string;
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
