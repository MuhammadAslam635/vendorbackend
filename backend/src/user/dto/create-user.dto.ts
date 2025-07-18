import { IsEmail, IsString, IsOptional, IsEnum, MinLength, IsArray, ArrayMinSize } from "class-validator";

// Enums to match your Prisma schema
enum UserType {
    VENDOR = "VENDOR",
    ADMIN = "ADMIN",
    SUBADMIN = "SUBADMIN"
}

enum UserStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
    BLOCKED = "BLOCKED"
}

enum PermissionType {
    APPROVAL = "Approval",
    EDITING = "Editing",
    DELETION = "Deletion"
}
enum RouteType {
    Promo = "/admin/promos",
    Admin = "/admin/create-user",
    Package = "/admin/packages",
    User = "/admin/users",
    Ticket="/admin/tickets",
}


export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(UserType)
    @IsOptional()
    utype?: UserType = UserType.VENDOR;

    @IsEnum(UserStatus)
    @IsOptional()
    status?: UserStatus = UserStatus.PENDING;

    @IsArray()
    @IsEnum(PermissionType, { each: true })
    @ArrayMinSize(1)
    @IsOptional()
    permissions?: PermissionType[];
    @IsArray()
    @IsEnum(RouteType, { each: true })
    @ArrayMinSize(1)
    @IsOptional()
    routes?: RouteType[];

}

// Export enums for use in other files
export { UserType, UserStatus, PermissionType,RouteType };