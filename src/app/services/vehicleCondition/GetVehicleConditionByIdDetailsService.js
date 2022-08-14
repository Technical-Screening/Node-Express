import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetVehicleConditionByIdDetailsService {
  /**
   * Return vehicle condition by id
   *
   * If you couldn't find vehicle condition, return 404 by default
   * @param {String} id
   * @return {Object} vehicleCondition
   */
  async run(id) {
    const vehicleCondition = await prisma.vehicleCondition.findFirst({
      where: {
        id,
        deleted: false,
      },
      select: {
        id: true,
        condition: true,
        createdAt: true,
      },
    });
    if (!vehicleCondition) throw new ValidationError(`vehicle condition for id ${id} has no details.`, 422);
    return vehicleCondition;
  }
}

export default new GetVehicleConditionByIdDetailsService();
