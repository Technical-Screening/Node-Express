import { ValidationError } from 'yup';
import GetVehicleTypeDetailsByIdService from './GetVehicleTypeDetailsByIdService';
import prisma from '../../configs/db-client';

class CreateVehicleTypeDetailsService {
  /**
   * create a vehicle type detail
   * @param {String} vehicleType
   * @param {String} addedBy
   */
  async run(data) {
    const vehicleType = await prisma.vehicleType.create({
      data: {
        vehicleType: data.vehicleType,
        addedBy: data.addedBy,
      },
    });
    if (!vehicleType) throw new ValidationError('vehicle type cannot be created.', 422);
    return GetVehicleTypeDetailsByIdService.run(vehicleType.id);
  }
}

export default new CreateVehicleTypeDetailsService();
