/*
  Warnings:

  - Added the required column `tokenExpiresAt` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "tokenExpiresAt" TIMESTAMP(3) NOT NULL;
