-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETE', 'PARTIALLY_COMPLETE', 'INCOMPLETE');

-- CreateTable
CREATE TABLE "Day" (
    "date" DATE NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "dayDate" DATE NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dayDate" DATE NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Day_date_key" ON "Day"("date");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_dayDate_fkey" FOREIGN KEY ("dayDate") REFERENCES "Day"("date") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_dayDate_fkey" FOREIGN KEY ("dayDate") REFERENCES "Day"("date") ON DELETE RESTRICT ON UPDATE CASCADE;
