/*
  Warnings:

  - Added the required column `organizationName` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationURL` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "organizationName" TEXT NOT NULL,
ADD COLUMN     "organizationURL" TEXT NOT NULL;
