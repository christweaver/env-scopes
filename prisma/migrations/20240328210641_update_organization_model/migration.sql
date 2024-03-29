/*
  Warnings:

  - You are about to drop the column `organizationURL` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `organizationSlug` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationSlug]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationSlug` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Project_organizationSlug_key";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "organizationURL",
ADD COLUMN     "organizationSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "organizationSlug";

-- CreateIndex
CREATE UNIQUE INDEX "Organization_organizationSlug_key" ON "Organization"("organizationSlug");
