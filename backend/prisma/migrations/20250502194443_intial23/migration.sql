/*
  Warnings:

  - You are about to drop the column `businessName` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `profileImg` on the `Vendor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "packageActive" SET DEFAULT 'NO';

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "businessName",
DROP COLUMN "profileImg",
ADD COLUMN     "fb" TEXT,
ADD COLUMN     "in" TEXT,
ADD COLUMN     "ln" TEXT,
ADD COLUMN     "yt" TEXT;
