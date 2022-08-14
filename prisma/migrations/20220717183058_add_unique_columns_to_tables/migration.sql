/*
  Warnings:

  - A unique constraint covering the columns `[fuelType]` on the table `FuelType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[condition]` on the table `VehicleCondition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vehicleMake]` on the table `VehicleMake` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vehicleOption]` on the table `VehicleOption` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vehicleType]` on the table `VehicleType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `FuelType_fuelType_key` ON `FuelType`(`fuelType`);

-- CreateIndex
CREATE UNIQUE INDEX `VehicleCondition_condition_key` ON `VehicleCondition`(`condition`);

-- CreateIndex
CREATE UNIQUE INDEX `VehicleMake_vehicleMake_key` ON `VehicleMake`(`vehicleMake`);

-- CreateIndex
CREATE UNIQUE INDEX `VehicleOption_vehicleOption_key` ON `VehicleOption`(`vehicleOption`);

-- CreateIndex
CREATE UNIQUE INDEX `VehicleType_vehicleType_key` ON `VehicleType`(`vehicleType`);
