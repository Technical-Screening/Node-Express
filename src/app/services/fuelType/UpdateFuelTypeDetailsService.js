import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';
import GetFuelTypeDetailsByIdService from './GetFuelTypeDetailsByIdService';

class UpdateFuelTypeDetailsService {
  /**
   * update fuel type details based on id
   * @param {String} id
   * @param {Object} data
   * @returns {Object} fuelType
   */
  async run(id, { id: _, ...data }) {
    const fuelType = await prisma.fuelType.update({
      where: {
        id,
        deleted: false,
      },
      data: {
        fuelType: data.fuelType,
      },
    });
    if (!fuelType) throw new ValidationError('fuel type cannot be updated.', 422);
    return GetFuelTypeDetailsByIdService.run(id);
  }
}

export default new UpdateFuelTypeDetailsService();
