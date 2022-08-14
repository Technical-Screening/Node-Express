import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class DeleteVehicleConditionDetailsService {
  /**
   * Delete a vehicle condition
   * @param {String} id
   * @return {Object} message
   */
  async run(id) {
    const vehicleCondition = await prisma.vehicleCondition.updateMany({
      where: {
        id,
        deleted: false,
      },
      data: {
        deleted: true,
      },
    });
    if (!vehicleCondition) throw new ValidationError(`vehicle condition for id ${id} cannot be found.`, 422);
    return { message: `${vehicleCondition.vehicleCondition} deleted successfully!` };
  }
}

export default new DeleteVehicleConditionDetailsService();
