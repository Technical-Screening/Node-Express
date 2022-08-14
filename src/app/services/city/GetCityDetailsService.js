import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetCityDetailsService {
  /**
   * Return list of cities
   *
   * If you couldn't find any city, return 404 by default
   * @return {Array} cities
   */
  async run() {
    const cities = await prisma.city.findMany({
      where: {
        deleted: false,
      },
      select: {
        name: true,
        createdAt: true,
      },
    });
    if (!cities) throw new ValidationError('city name cannot be found.', 422);
    return cities;
  }
}

export default new GetCityDetailsService();
