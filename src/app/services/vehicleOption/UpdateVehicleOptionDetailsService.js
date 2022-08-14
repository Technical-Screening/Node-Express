import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';
import GetVehicleOptionByIdDetailsService from './GetVehicleOptionByIdDetailsService';

class UpdateVehicleOptionDetailsService {
  /**
   * update vehicle option
   * @param {ID} id
   * @param {Request} data
   * @return {Object} vehicleOption
   */
  async run(id, { id: _, ...data }) {
    const vehicleOption = await prisma.vehicleOption.update({
      where: {
        id,
      },
      data: {
        vehicleOption: data.vehicleOption,
      },
    });
    if (!vehicleOption) throw new ValidationError(`vehicle option for id ${id} cannot be updated.`);
    return GetVehicleOptionByIdDetailsService.run(id);
  }
}

export default new UpdateVehicleOptionDetailsService();
