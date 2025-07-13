/*
  Warnings:

  - Added the required column `maxZipCode` to the `Promo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promo" ADD COLUMN     "maxZipCode" INTEGER NOT NULL;
