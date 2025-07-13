-- AlterEnum
ALTER TYPE "UserType" ADD VALUE 'SUPERADMIN';

-- CreateTable
CREATE TABLE "Promo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isSiteWide" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Promo_code_key" ON "Promo"("code");

-- CreateIndex
CREATE INDEX "Promo_code_idx" ON "Promo"("code");

-- CreateIndex
CREATE INDEX "Promo_createdBy_idx" ON "Promo"("createdBy");

-- CreateIndex
CREATE INDEX "Promo_startDate_endDate_idx" ON "Promo"("startDate", "endDate");

-- AddForeignKey
ALTER TABLE "Promo" ADD CONSTRAINT "Promo_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
