/*
  Warnings:

  - Added the required column `title` to the `SpreadSheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SpreadSheet" ADD COLUMN     "title" TEXT NOT NULL;
