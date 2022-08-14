-- CreateTable
CREATE TABLE `Transmission` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `addedBy` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehicleDetail` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `cityId` VARCHAR(191) NOT NULL,
    `vehicleTypeId` VARCHAR(191) NOT NULL,
    `vehicleConditionId` VARCHAR(191) NOT NULL,
    `vehicleMakeId` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `slug` VARCHAR(191) NOT NULL,
    `manufactureYear` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NULL,
    `ongoingLease` BOOLEAN NOT NULL DEFAULT false,
    `transmissionId` VARCHAR(191) NOT NULL,
    `fuelTypeId` VARCHAR(191) NOT NULL,
    `engineCapacity` VARCHAR(191) NULL,
    `milage` DOUBLE NOT NULL,
    `vehicleOptionsId` VARCHAR(191) NOT NULL,
    `info` VARCHAR(191) NOT NULL,
    `addedBy` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transmission` ADD CONSTRAINT `Transmission_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_vehicleTypeId_fkey` FOREIGN KEY (`vehicleTypeId`) REFERENCES `VehicleType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_vehicleConditionId_fkey` FOREIGN KEY (`vehicleConditionId`) REFERENCES `VehicleCondition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_vehicleMakeId_fkey` FOREIGN KEY (`vehicleMakeId`) REFERENCES `VehicleMake`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_fuelTypeId_fkey` FOREIGN KEY (`fuelTypeId`) REFERENCES `FuelType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_vehicleOptionsId_fkey` FOREIGN KEY (`vehicleOptionsId`) REFERENCES `VehicleOption`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDetail` ADD CONSTRAINT `VehicleDetail_transmissionId_fkey` FOREIGN KEY (`transmissionId`) REFERENCES `Transmission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
