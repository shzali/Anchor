/*
  Warnings:

  - You are about to drop the column `dayDate` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_dayDate_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "dayDate";
