/*
  Warnings:

  - A unique constraint covering the columns `[userId,refreshToken]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Session_userId_token_key";

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_refreshToken_key" ON "Session"("userId", "refreshToken");
