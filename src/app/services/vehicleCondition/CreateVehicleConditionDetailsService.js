import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';
import GetVehicleConditionByIdDetailsService from './GetVehicleConditionByIdDetailsService';

class CreateVehicleConditionDetailsService {
  /**
   * Return vehicle condition by id
   *
   * If you couldn't find vehicle condition, return 404 by default
   * @param {Object} data
   * @return {Array} vehicleCondition
   */
  async run(data) {
    const vehicleCondition = await prisma.vehicleCondition.create({
      data: {
        condition: data.condition,
        addedBy: data.addedBy,
      },
    });
    if (!vehicleCondition) throw new ValidationError('vehicle condition cannot be created.', 422);
    return GetVehicleConditionByIdDetailsService.run(vehicleCondition.id);
  }
}

export default new CreateVehicleConditionDetailsService();
