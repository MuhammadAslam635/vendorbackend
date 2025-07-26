-- AlterEnum
ALTER TYPE "PermissionType" ADD VALUE 'Create';

-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "description" SET DEFAULT 'Best Package for your business 
 Optimize and grow your business with our best package 
 No 1 Package for your business';

-- AlterTable
ALTER TABLE "routes" ALTER COLUMN "name" SET DEFAULT '/admin/packages';
