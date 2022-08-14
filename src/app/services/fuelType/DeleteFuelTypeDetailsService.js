import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class DeleteFuleTypeDetailsService {
  /**
   * Delete a fuel type
   * @param {String} id
   * @return {Object} message
   */
  async run(id) {
    const fuelType = await prisma.fuelType.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    if (!fuelType) throw new ValidationError('fuel type cannot be deleted.', 422);
    return { message: `${fuelType.fuelType} deleted successfully.` };
  }
}

export default new DeleteFuleTypeDetailsService();
