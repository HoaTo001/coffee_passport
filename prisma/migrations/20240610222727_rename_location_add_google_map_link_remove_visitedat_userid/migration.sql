/*
  Warnings:

  - You are about to drop the column `location` on the `CoffeeStore` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CoffeeStore` table. All the data in the column will be lost.
  - Added the required column `address` to the `CoffeeStore` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoffeeStore" DROP CONSTRAINT "CoffeeStore_userId_fkey";

-- AlterTable
ALTER TABLE "CoffeeStore" DROP COLUMN "location",
DROP COLUMN "userId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "google_map_link" TEXT,
ALTER COLUMN "visitedAt" DROP NOT NULL;
