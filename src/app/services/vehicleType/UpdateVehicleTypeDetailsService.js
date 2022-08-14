import { ValidationError } from 'yup';
import GetVehicleTypeDetailsByIdService from './GetVehicleTypeDetailsByIdService';
import prisma from '../../configs/db-client';

class UpdateVehicleTypeDetailsService {
  /**
   * update vehicle details
   * @param {ID} id
   * @param {Request} data
   * @returns {Object} vehicleType
   */
  async run(id, { id: _, ...data }) {
    const vehicleType = await prisma.vehicleType.updateMany({
      where: {
        id,
        deleted: false,
      },
      data: {
        vehicleType: data.vehicleType,
      },
    });
    if (!vehicleType) throw new ValidationError('vehicle type cannot be updated.', 422);
    return GetVehicleTypeDetailsByIdService.run(id);
  }
}

export default new UpdateVehicleTypeDetailsService();
