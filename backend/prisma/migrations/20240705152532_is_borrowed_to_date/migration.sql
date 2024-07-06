/*
  Warnings:

  - The `isBorrowed` column on the `book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `isBorrowed`,
    ADD COLUMN `isBorrowed` DATETIME(3) NULL;
