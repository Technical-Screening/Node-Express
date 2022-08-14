import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class DeleteVehicleDetailsService {
  /**
     * Delete a vehicle detail
     * @param {String} id
     * @return {JSON} message
     */
  async run(id) {
    const vehicleDetail = await prisma.vehicleDetail.updateMany({
      where: {
        id,
        deleted: false,
      },
      data: {
        deleted: true,
      },
    });
    if (!vehicleDetail) throw new ValidationError(`vehicle detail for id ${id} cannot be found.`, 422);
    return { message: `${vehicleDetail.vehicleDetail} deleted successfully.` };
  }
}

export default new DeleteVehicleDetailsService();
