/*
  Warnings:

  - Added the required column `updated_at` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('BANK', 'CASH');

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "BankAccountType" NOT NULL DEFAULT 'BANK',
    "initialValue" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);
