import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

export class CsvImportUserDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateUserDto)
    users: CreateUserDto[];
}

export interface CsvUserRow {
    name: string;
    email: string;
    phone?: string;
    password: string;
    utype: 'ADMIN' | 'SUBADMIN';
    status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'BLOCKED';
    permissions: string; // Comma-separated permissions
    routes: string; // Comma-separated routes
}