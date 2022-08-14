import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class DeleteVehicleMakeDetailsService {
  /**
   * Delete a vehicle make
   * @param {String} id
   * @return {Object} message
   */
  async run(id) {
    const vehicleMake = await prisma.vehicleMake.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    if (!vehicleMake) throw new ValidationError(`vehicle make for id ${id} cannot be found.`, 422);
    return { message: `${vehicleMake.vehicleMake} deleted successfully!` };
  }
}

export default new DeleteVehicleMakeDetailsService();
