/*
  Warnings:

  - You are about to drop the column `address` on the `CoffeeStore` table. All the data in the column will be lost.
  - You are about to drop the column `google_map_link` on the `CoffeeStore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoffeeStore" DROP COLUMN "address",
DROP COLUMN "google_map_link";
