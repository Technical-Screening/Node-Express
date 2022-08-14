import { ValidationError } from 'yup';
import Prisma from '../../configs/db-client';
import GetCityDetailsByIdService from '../city/GetCityDetailsByIdService';

class CreateFuelTypeDetailsService {
  /**
   * create new fuel type
   * @param {Object} data
   * @return {Object} fuelType
   */
  async run(data) {
    const fuelType = await Prisma.fuelType.create({
      data: {
        fuelType: data.fuelType,
        addedBy: data.addedBy,
      },
    });
    if (!fuelType) throw new ValidationError('fuel type cannot be created.', 422);
    return GetCityDetailsByIdService.run(fuelType.id);
  }
}

export default new CreateFuelTypeDetailsService();
