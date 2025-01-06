/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_householdId_fkey";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Admin";
