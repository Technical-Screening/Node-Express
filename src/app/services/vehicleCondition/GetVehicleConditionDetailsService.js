import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetVehicleConditionDetailsService {
  /**
   * Return all vehicle condition list
   *
   * If you couldn't find vehicle option, return 404 by default
   * @return {Array} vehicleCondition
   */
  async run() {
    const vehicleCondition = await prisma.vehicleCondition.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        condition: true,
        createdAt: true,
      },
    });
    if (!vehicleCondition) throw new ValidationError('vehicle conditions cannot find.', 422);
    return vehicleCondition;
  }
}

export default new GetVehicleConditionDetailsService();
