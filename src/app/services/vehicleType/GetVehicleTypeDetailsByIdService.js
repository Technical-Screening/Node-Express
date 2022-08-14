import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetVehicleTypeDetailsByIdService {
  /**
   * Return vehicle type by id
   *
   * If you couldn't find vehicle type, return 404 by default
   * @param {String} id
   * @return {Object} vehicleType
   */
  async run(id) {
    const vehicleType = await prisma.vehicleType.findFirst({
      where: {
        id,
        deleted: false,
      },
      select: {
        id: true,
        vehicleType: true,
        createdAt: true,
      },
    });
    if (!vehicleType) throw new ValidationError('vehicle type cannot be found.', 422);
    return vehicleType;
  }
}

export default new GetVehicleTypeDetailsByIdService();
