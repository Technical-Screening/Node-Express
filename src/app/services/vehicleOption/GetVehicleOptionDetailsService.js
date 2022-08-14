import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetVehicleOptionDetailsService {
  /**
   * Return all vehicle option list
   *
   * If you couldn't find vehicle options, return 404 by default
   * @return {Array} vehicleOption
   */
  async run() {
    const vehicleOption = await prisma.vehicleOption.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        vehicleOption: true,
        createdAt: true,
      },
    });
    if (!vehicleOption) throw new ValidationError('vehicle option cannot be find.', 422);
    return vehicleOption;
  }
}

export default new GetVehicleOptionDetailsService();
