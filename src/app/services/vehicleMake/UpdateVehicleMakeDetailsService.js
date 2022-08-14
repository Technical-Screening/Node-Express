import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';
import GetVehicleMakeDetailsByIdDetailsService from './GetVehicleMakeDetailsByIdDetailsService';

class UpdateVehicleMakeDetailsService {
  /**
   * update vehicle option
   * @param {ID} id
   * @param _
   * @param {Request} data
   * @return {Object} vehicleMakeById
   */
  async run(id, { id: _, ...data }) {
    const vehicleMake = await prisma.vehicleMake.updateMany({
      where: {
        id,
        deleted: false,
      },
      data: {
        vehicleMake: data.vehicleMake,
      },
    });
    if (!vehicleMake) throw new ValidationError(`vehicle make for id ${id} cannot be updated.`);
    return GetVehicleMakeDetailsByIdDetailsService.run(id);
  }
}

export default new UpdateVehicleMakeDetailsService();
