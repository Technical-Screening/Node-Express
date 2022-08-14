import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetVehicleMakeDetailsService {
  /**
   * Return all vehicle make list
   *
   * If you couldn't find vehicle make, return 404 by default
   * @return {Array} vehicleMake
   */
  async run() {
    const vehicleMake = await prisma.vehicleMake.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        vehicleMake: true,
        createdAt: true,
      },
    });
    if (!vehicleMake) throw new ValidationError('vehicle make cannot be found', 422);
    return vehicleMake;
  }
}

export default new GetVehicleMakeDetailsService();
