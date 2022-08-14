import { ValidationError } from 'yup';
import slugify from 'slugify';
import GetVehicleDetailsByIdService from './GetVehicleDetailsByIdService';
import prisma from '../../configs/db-client';

class UpdateVehicleDetailsService {
  /**
   * update vehicle details
   * @param {String} id
   * @param {Request} data
   * @return {Object} vehicleDetailsById
   */
  async run(id, { id: _, ...data }) {
    // create a slug
    const slug = slugify(data.name);
    // update vehicle details
    const vehicleDetail = await prisma.vehicleDetail.update({
      where: {
        id,
        deleted: false,
      },
      data: {
        name: data.name,
        contact: data.contact,
        cityId: data.cityId,
        vehicleTypeId: data.vehicleTypeId,
        vehicleConditionId: data.vehicleConditionId,
        vehicleMakeId: data.vehicleMakeId,
        model: data.model,
        slug,
        manufactureYear: data.manufactureYear,
        price: data.price,
        ongoingLease: data.ongoingLease,
        transmissionId: data.transmissionId,
        fuelTypeId: data.fuelTypeId,
        engineCapacity: data.engineCapacity,
        milage: data.milage,
        vehicleOptionsId: data.vehicleOptionsId,
        info: data.info,
        addedBy: data.addedBy,
      },
    });
    if (!vehicleDetail) throw new ValidationError(`vehicle detail for id ${id} cannot be updated.`);
    return GetVehicleDetailsByIdService.run(vehicleDetail.id);
  }
}

export default new UpdateVehicleDetailsService();
