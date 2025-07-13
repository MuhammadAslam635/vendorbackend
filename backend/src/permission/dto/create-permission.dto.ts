import { IsEnum, IsNumber, IsString } from "class-validator";
enum PermissionType {
    APPROVAL = 'Approval',
    EDITING = "Editing",
    DELETION = "Deletion",
}
export class CreatePermissionDto {
    @IsNumber()
    userId: number
    @IsEnum(PermissionType)
    name: PermissionType
}
