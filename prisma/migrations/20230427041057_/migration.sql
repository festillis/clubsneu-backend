/*
  Warnings:

  - You are about to drop the column `verificationCode` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verificationCode";

-- CreateTable
CREATE TABLE "VerificationCode" (
    "userEmail" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_userEmail_key" ON "VerificationCode"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
