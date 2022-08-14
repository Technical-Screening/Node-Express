import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetVehicleMakeDetailsByIdDetailsService {
  /**
   * Return vehicle make by id
   *
   * If you couldn't find vehicle make, return 404 by default
   * @param {String} id
   * @return {Object} vehicleMake
   */
  async run(id) {
    const vehicleMake = await prisma.vehicleMake.findFirst({
      where: {
        id,
        deleted: false,
      },
      select: {
        id: true,
        vehicleMake: true,
        createdAt: true,
      },
    });
    if (!vehicleMake) throw new ValidationError(`vehicle make for id ${id} has no details.`, 422);
    return vehicleMake;
  }
}

export default new GetVehicleMakeDetailsByIdDetailsService();
