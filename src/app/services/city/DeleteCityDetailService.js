import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class DeleteCityDetailService {
  /**
   * Delete a city
   * @param {String} id
   * @return {Object} message
   */
  async run(id) {
    const city = await prisma.city.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });

    if (!city) throw new ValidationError('city details cannot be deleted.', 422);
    return { message: `${city.name} city deleted successfully.` };
  }
}

export default new DeleteCityDetailService();
