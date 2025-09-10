/*
  Warnings:

  - A unique constraint covering the columns `[stripeProductId]` on the table `Package` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripePriceId]` on the table `Package` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripePackageId]` on the table `Package` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `SubscribePackage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "stripePackageId" TEXT,
ADD COLUMN     "stripePriceId" TEXT,
ADD COLUMN     "stripeProductId" TEXT;

-- AlterTable
ALTER TABLE "SubscribePackage" ADD COLUMN     "stripeSubscriptionId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeCustomerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Package_stripeProductId_key" ON "Package"("stripeProductId");

-- CreateIndex
CREATE UNIQUE INDEX "Package_stripePriceId_key" ON "Package"("stripePriceId");

-- CreateIndex
CREATE UNIQUE INDEX "Package_stripePackageId_key" ON "Package"("stripePackageId");

-- CreateIndex
CREATE UNIQUE INDEX "SubscribePackage_stripeSubscriptionId_key" ON "SubscribePackage"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "SubscribePackage_stripeSubscriptionId_idx" ON "SubscribePackage"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");
