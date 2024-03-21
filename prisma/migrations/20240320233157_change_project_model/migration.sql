/*
  Warnings:

  - You are about to drop the column `apiKey` on the `Envs` table. All the data in the column will be lost.
  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `envSecretValue` to the `Envs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environmentName` to the `Envs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_organizationId_fkey";

-- AlterTable
ALTER TABLE "Envs" DROP COLUMN "apiKey",
ADD COLUMN     "envSecretValue" TEXT NOT NULL,
ADD COLUMN     "environmentName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("organizationName");

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "organizationId",
ADD COLUMN     "organizationOrganizationName" TEXT;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_organizationOrganizationName_fkey" FOREIGN KEY ("organizationOrganizationName") REFERENCES "Organization"("organizationName") ON DELETE SET NULL ON UPDATE CASCADE;
