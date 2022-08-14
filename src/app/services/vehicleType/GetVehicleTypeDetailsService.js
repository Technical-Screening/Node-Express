import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetVehicleTypeDetailsService {
  /**
   * Return list of vehicle types
   *
   * If you couldn't find any vehicle type, return 404 by default
   * @return {Object} vehicleType
   */
  async run() {
    const vehicleType = await prisma.vehicleType.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        vehicleType: true,
        createdAt: true,
      },
    });
    if (!vehicleType) throw new ValidationError('vehicle type details cannot be found.', 422);
    return vehicleType;
  }
}

export default new GetVehicleTypeDetailsService();
