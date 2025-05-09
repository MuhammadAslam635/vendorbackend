export declare enum PackageStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class CreatePackageDto {
    name?: string;
    price: number;
    duration: number;
    profiles: number;
    description?: string;
    status?: PackageStatus;
}
