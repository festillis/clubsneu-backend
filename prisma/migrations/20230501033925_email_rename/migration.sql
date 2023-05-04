/*
  Warnings:

  - The primary key for the `VerificationCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userEmail` on the `VerificationCode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `VerificationCode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `VerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VerificationCode_userEmail_key";

-- AlterTable
ALTER TABLE "VerificationCode" DROP CONSTRAINT "VerificationCode_pkey",
DROP COLUMN "userEmail",
ADD COLUMN     "email" TEXT NOT NULL,
ADD CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_email_key" ON "VerificationCode"("email");
