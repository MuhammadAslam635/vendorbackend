/*
  Warnings:

  - The values [PENDING] on the enum `ChatStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Read,Write,Delete] on the enum `PermissionType` will be removed. If these variants are still used in the database, this will fail.
  - The values [CUSTOMER] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChatStatus_new" AS ENUM ('OPEN', 'INPROGRESS', 'CLOSED', 'RESOLVED');
ALTER TABLE "Chat" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Chat" ALTER COLUMN "status" TYPE "ChatStatus_new" USING ("status"::text::"ChatStatus_new");
ALTER TYPE "ChatStatus" RENAME TO "ChatStatus_old";
ALTER TYPE "ChatStatus_new" RENAME TO "ChatStatus";
DROP TYPE "ChatStatus_old";
ALTER TABLE "Chat" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PermissionType_new" AS ENUM ('Approval', 'Editing', 'Deletion');
ALTER TABLE "permissions" ALTER COLUMN "name" DROP DEFAULT;
ALTER TABLE "permissions" ALTER COLUMN "name" TYPE "PermissionType_new" USING ("name"::text::"PermissionType_new");
ALTER TYPE "PermissionType" RENAME TO "PermissionType_old";
ALTER TYPE "PermissionType_new" RENAME TO "PermissionType";
DROP TYPE "PermissionType_old";
ALTER TABLE "permissions" ALTER COLUMN "name" SET DEFAULT 'Approval';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('VENDOR', 'SUBADMIN', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "utype" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "utype" TYPE "UserType_new" USING ("utype"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
ALTER TABLE "User" ALTER COLUMN "utype" SET DEFAULT 'VENDOR';
COMMIT;

-- AlterTable
ALTER TABLE "permissions" ALTER COLUMN "name" SET DEFAULT 'Approval';
