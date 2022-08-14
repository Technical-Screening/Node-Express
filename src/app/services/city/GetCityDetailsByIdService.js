import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetCityDetailsByIdService {
  /**
   * Return city name by id
   *
   * If this city wasn't found, return 404 by default
   * @param {String} id
   * @return {Object} cityById
   */
  async run(id) {
    const city = await prisma.city.findFirst({
      where: {
        id,
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
    if (!city) throw new ValidationError('city not found', 404);
    return city;
  }
}

export default new GetCityDetailsByIdService();
