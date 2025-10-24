/*
  Warnings:

  - You are about to drop the column `Favorite` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "Favorite",
ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false;
