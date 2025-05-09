-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "description" TEXT DEFAULT 'Best Package for your business /n Optimize and grow your business with our best package /n No 1 Package for your business',
ADD COLUMN     "profiles" INTEGER NOT NULL DEFAULT 3,
ALTER COLUMN "price" SET DEFAULT 150;
