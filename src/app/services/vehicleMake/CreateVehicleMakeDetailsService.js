import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';
import GetVehicleMakeDetailsByIdDetailsService from './GetVehicleMakeDetailsByIdDetailsService';

class CreateVehicleMakeDetailsService {
  /**
   * create a vehicle make
   * @param {Object} data
   * @return {Object} vehicleMakeById
   */
  async run(data) {
    const vehicleMake = await prisma.vehicleMake.create({
      data: {
        vehicleMake: data.vehicleMake,
        addedBy: data.addedBy,
      },
    });
    if (!vehicleMake) throw new ValidationError('vehicle make cannot be created.', 422);
    return GetVehicleMakeDetailsByIdDetailsService.run(vehicleMake.id);
  }
}

export default new CreateVehicleMakeDetailsService();
