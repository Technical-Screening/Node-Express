/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `VehicleDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `VehicleDetail_name_key` ON `VehicleDetail`(`name`);
