/*
  Warnings:

  - Added the required column `provider_id` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "provider_id" TEXT NOT NULL;
