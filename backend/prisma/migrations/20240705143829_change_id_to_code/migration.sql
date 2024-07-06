/*
  Warnings:

  - The primary key for the `book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `book` table. All the data in the column will be lost.
  - The primary key for the `member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `member` table. All the data in the column will be lost.
  - The required column `code` was added to the `Book` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `code` was added to the `Member` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_memberId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `memberId`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `memberCode` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`code`);

-- AlterTable
ALTER TABLE `member` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`code`);

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_memberCode_fkey` FOREIGN KEY (`memberCode`) REFERENCES `Member`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;
