/*
  Warnings:

  - Added the required column `dayDate` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "dayDate" DATE NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_dayDate_fkey" FOREIGN KEY ("dayDate") REFERENCES "Day"("date") ON DELETE RESTRICT ON UPDATE CASCADE;
