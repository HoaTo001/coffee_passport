/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `CoffeeStore` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CoffeeStore" ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "review" TEXT,
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeStore_slug_key" ON "CoffeeStore"("slug");
