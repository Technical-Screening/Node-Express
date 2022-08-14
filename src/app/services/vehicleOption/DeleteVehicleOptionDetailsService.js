import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class DeleteVehicleOptionDetailsService {
  /**
   * Delete a vehicle option
   * @param {Request} id
   * @return {JSON} message
   */
  async run(id) {
    const vehicleOption = await prisma.vehicleOption.updateMany({
      where: {
        id,
        deleted: false,
      },
      data: {
        deleted: true,
      },
    });
    if (!vehicleOption) throw new ValidationError(`vehicle option for id ${id} cannot be found.`, 422);
    return { message: `${vehicleOption.vehicleOption} deleted successfully.` };
  }
}

export default new DeleteVehicleOptionDetailsService();
