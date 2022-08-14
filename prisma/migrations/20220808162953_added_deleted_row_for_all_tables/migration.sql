/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `FuelType` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Transmission` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `VehicleCondition` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `VehicleDetail` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `VehicleImage` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `VehicleMake` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `VehicleOption` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `VehicleType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `City` DROP FOREIGN KEY `City_addedBy_fkey`;

-- DropForeignKey
ALTER TABLE `FuelType` DROP FOREIGN KEY `FuelType_addedBy_fkey`;

-- DropForeignKey
ALTER TABLE `Transmission` DROP FOREIGN KEY `Transmission_addedBy_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleCondition` DROP FOREIGN KEY `VehicleCondition_addedBy_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDetail` DROP FOREIGN KEY `VehicleDetail_addedBy_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDetail` DROP FOREIGN KEY `VehicleDetail_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDetail` DROP FOREIGN KEY `VehicleDetail_fuelTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDetail` DROP FOREIGN KEY `VehicleDetail_transmissionId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDetail` DROP FOREIGN KEY `VehicleDetail_vehicleConditionId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDetail` DROP FOREIGN KEY `VehicleDetail_vehicleMakeId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDetail` DROP FOREIGN KEY `VehicleDetail_vehicleOptionsId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDetail` DROP FOREIGN KEY `VehicleDetail_vehicleTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleImage` DROP FOREIGN KEY `VehicleImage_addedBy_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleMake` DROP FOREIGN KEY `VehicleMake_addedBy_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleOption` DROP FOREIGN KEY `VehicleOption_addedBy_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleType` DROP FOREIGN KEY `VehicleType_addedBy_fkey`;

-- AlterTable
ALTER TABLE `City` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `FuelType` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Transmission` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `VehicleCondition` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `VehicleDetail` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `VehicleImage` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `VehicleMake` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `VehicleOption` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `VehicleType` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `City` ADD CONSTRAINT `City_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleType` ADD CONSTRAINT `VehicleType_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleCondition` ADD CONSTRAINT `VehicleCondition_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleMake` ADD CONSTRAINT `VehicleMake_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FuelType` ADD CONSTRAINT `FuelType_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleOption` ADD CONSTRAINT `VehicleOption_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleImage` ADD CONSTRAINT `VehicleImage_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transmission` ADD CONSTRAINT `Transmission_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_vehicleTypeId_fkey` FOREIGN KEY (`vehicleTypeId`) REFERENCES `VehicleType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_vehicleConditionId_fkey` FOREIGN KEY (`vehicleConditionId`) REFERENCES `VehicleCondition`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_vehicleMakeId_fkey` FOREIGN KEY (`vehicleMakeId`) REFERENCES `VehicleMake`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_fuelTypeId_fkey` FOREIGN KEY (`fuelTypeId`) REFERENCES `FuelType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_vehicleOptionsId_fkey` FOREIGN KEY (`vehicleOptionsId`) REFERENCES `VehicleOption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_transmissionId_fkey` FOREIGN KEY (`transmissionId`) REFERENCES `Transmission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
