import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';
import GetCityDetailsByIdService from './GetCityDetailsByIdService';

class CreateCityDetailService {
  /**
   * create new city
   * @param {Object} data
   * @return {Object} cityById
   */
  async run(data) {
    const city = await prisma.city.create({
      data: {
        name: data.name,
        addedBy: data.addedBy,
      },
    });
    if (!city) throw new ValidationError('city details cannot be created.', 422);
    return GetCityDetailsByIdService.run(city.id);
  }
}

export default new CreateCityDetailService();
