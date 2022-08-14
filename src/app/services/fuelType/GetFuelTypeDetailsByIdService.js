import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetFuelTypeDetailsByIdService {
  /**
   * Return fuel type by id
   *
   * If you couldn't find any city, return 404 by default
   * @param {String} id
   * @return {Object} fuelType
   */
  async run(id) {
    const fuelType = await prisma.fuelType.findFirst({
      where: {
        id,
        deleted: false,
      },
      select: {
        id: true,
        fuelType: true,
        createdAt: true,
      },
    });
    if (!fuelType) throw new ValidationError('fuel type cannot be found.', 422);
    return fuelType;
  }
}

export default new GetFuelTypeDetailsByIdService();
