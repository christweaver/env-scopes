/*
  Warnings:

  - You are about to drop the column `projectURL` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationSlug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projectURL",
ADD COLUMN     "organizationSlug" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Project_organizationSlug_key" ON "Project"("organizationSlug");
