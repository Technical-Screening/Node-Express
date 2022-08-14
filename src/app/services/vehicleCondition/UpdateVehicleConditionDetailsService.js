import { ValidationError } from 'yup';
import GetVehicleConditionByIdDetailsService from './GetVehicleConditionByIdDetailsService';
import prisma from '../../configs/db-client';

class UpdateVehicleConditionDetailsService {
  /**
   * update vehicle condition
   * @param {ID} id
   * @param {Request} data
   * @return {Object} vehicleConditionById
   */
  async run(id, { id: _, ...data }) {
    const vehicleCondition = await prisma.vehicleCondition.updateMany({
      where: {
        id,
        deleted: false,
      },
      data: {
        condition: data.vehicleCondition,
      },
    });
    if (!vehicleCondition) throw new ValidationError(`vehicle condition for id ${id} cannot be updated.`);
    return GetVehicleConditionByIdDetailsService.run(id);
  }
}

export default new UpdateVehicleConditionDetailsService();
