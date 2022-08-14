import { PrismaClient } from '@prisma/client';
import { ValidationError } from 'yup';
import GetVehicleOptionByIdDetailsService from './GetVehicleOptionByIdDetailsService';

const prisma = new PrismaClient();

class CreateVehicleOptionDetailsService {
  /**
   * create a vehicle option
   * @param {String} vehicleOption
   * @param {String} addedBy
   */
  async run(data) {
    const vehicleOption = await prisma.vehicleOption.create({
      data: {
        vehicleOption: data.vehicleOption,
        addedBy: data.addedBy,
      },
    });
    if (!vehicleOption) throw new ValidationError('vehicle option cannot be created.', 422);
    return GetVehicleOptionByIdDetailsService.run(vehicleOption.id);
  }
}

export default new CreateVehicleOptionDetailsService();
