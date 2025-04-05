/*
  Warnings:

  - You are about to drop the `Label` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_labelId_fkey";

-- DropTable
DROP TABLE "Label";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "priority" "Priority",
    "labelId" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "label" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "label_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "label_title_key" ON "label"("title");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
