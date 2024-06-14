/*
  Warnings:

  - Added the required column `address` to the `CoffeeStore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoffeeStore" ADD COLUMN     "address" TEXT NOT NULL;
ALTER TABLE "CoffeeStore" ADD COLUMN     "google_map_link" TEXT;
