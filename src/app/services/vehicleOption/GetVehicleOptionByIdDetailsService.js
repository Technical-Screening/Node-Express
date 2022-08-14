import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetVehicleOptionByIdDetailsService {
  /**
   * Return vehicle option by id
   *
   * If you couldn't find vehicle options, return 404 by default
   * @param {String} id
   * @return {Object} vehicleOption
   */
  async run(id) {
    const vehicleOption = await prisma.vehicleOption.findFirst({
      where: {
        id,
        deleted: false,
      },
      select: {
        id: true,
        vehicleOption: true,
        createdAt: true,
      },
    });
    if (!vehicleOption) throw new ValidationError(`vehicle option for id ${id} has no details.`, 422);
    return vehicleOption;
  }
}

export default new GetVehicleOptionByIdDetailsService();
