import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';
import GetCityDetailsByIdService from './GetCityDetailsByIdService';

class UpdateCityDetailService {
  /**
   * update city details based on id
   * @param {String} id
   * @param {Object} data
   * @return {Object} cityById
   */
  async run(id, { id: _, ...data }) {
    const city = await prisma.city.updateMany({
      where: {
        id,
        deleted: false,
      },
      data: {
        name: data.name,
      },
    });
    if (!city) throw new ValidationError('city details cannot be updated.', 422);
    return GetCityDetailsByIdService.run(id);
  }
}

export default new UpdateCityDetailService();
