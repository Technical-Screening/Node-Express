import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class DeleteVehicleTypeDetailsService {
  /**
   * Delete a vehicle type
   * @param {String} id
   * @return {JSON} message
   */
  async run(id) {
    const vehicleType = await prisma.vehicleType.updateMany({
      where: {
        id,
        deleted: false,
      },
      data: {
        deleted: true,
      },
    });
    if (!vehicleType) throw new ValidationError('vehicle type cannot be deleted.', 422);
    return { message: `${vehicleType.vehicleType} deleted successfully.` };
  }
}

export default new DeleteVehicleTypeDetailsService();
