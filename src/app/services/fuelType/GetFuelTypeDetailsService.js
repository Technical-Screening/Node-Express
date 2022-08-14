import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetFuelTypeDetailsService {
  /**
   * Return list of fuel types
   *
   * If you couldn't find any city, return 404 by default
   * @return {Array} fuelType
   */
  async run() {
    const fuelTypes = await prisma.fuelType.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        fuelType: true,
        createdAt: true,
      },
    });
    if (!fuelTypes) throw new ValidationError('fuel type details cannot be found', 422);
    return fuelTypes;
  }
}

export default new GetFuelTypeDetailsService();
