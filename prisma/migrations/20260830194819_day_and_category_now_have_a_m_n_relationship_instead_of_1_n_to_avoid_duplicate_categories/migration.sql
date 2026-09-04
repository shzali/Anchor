/*
  Warnings:

  - You are about to drop the column `dayDate` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_dayDate_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "dayDate";

-- CreateTable
CREATE TABLE "CategoryDay" (
    "categoryId" TEXT NOT NULL,
    "dayDate" DATE NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CategoryDay_pkey" PRIMARY KEY ("categoryId","dayDate")
);

-- AddForeignKey
ALTER TABLE "CategoryDay" ADD CONSTRAINT "CategoryDay_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryDay" ADD CONSTRAINT "CategoryDay_dayDate_fkey" FOREIGN KEY ("dayDate") REFERENCES "Day"("date") ON DELETE RESTRICT ON UPDATE CASCADE;
