/*
  Warnings:

  - The values [SYSTEM] on the enum `MessageType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MessageType_new" AS ENUM ('USER', 'ADMIN', 'SUBADMIN');
ALTER TABLE "Message" ALTER COLUMN "messageBy" DROP DEFAULT;
ALTER TABLE "Message" ALTER COLUMN "messageBy" TYPE "MessageType_new" USING ("messageBy"::text::"MessageType_new");
ALTER TYPE "MessageType" RENAME TO "MessageType_old";
ALTER TYPE "MessageType_new" RENAME TO "MessageType";
DROP TYPE "MessageType_old";
ALTER TABLE "Message" ALTER COLUMN "messageBy" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "adminId" INTEGER;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "attachments" TEXT;

-- CreateIndex
CREATE INDEX "Chat_adminId_idx" ON "Chat"("adminId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
