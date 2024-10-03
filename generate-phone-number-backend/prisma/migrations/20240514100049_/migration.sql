-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "tokenExpiresAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "SpreadSheet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "spreadsheetId" TEXT NOT NULL,
    "sheetName" TEXT,
    "headerRowIndex" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpreadSheet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpreadSheet" ADD CONSTRAINT "SpreadSheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
