-- CreateEnum
CREATE TYPE "VendorType" AS ENUM ('VENDOR', 'RENTAL', 'SALES');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "vendorType" "VendorType" DEFAULT 'VENDOR';
