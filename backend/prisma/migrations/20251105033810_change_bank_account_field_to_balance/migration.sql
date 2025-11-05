/*
  Warnings:

  - You are about to drop the column `initialValue` on the `BankAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "initialValue",
ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0;
