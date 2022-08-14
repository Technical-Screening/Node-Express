import { ValidationError } from 'yup';
import slugify from 'slugify';
import prisma from '../../configs/db-client';
import GetVehicleDetailsByIdService from './GetVehicleDetailsByIdService';

class CreateVehicleDetailsService {
  /**
   * Return vehicle details by id
   *
   * If you couldn't find vehicle detail, return 404 by default
   * @param {Object} data
   * @return {Array} vehicleDetail
   */
  async run(data) {
    // create a slug
    const slug = slugify(data.name);
    // create vehicle details
    const vehicleDetail = await prisma.vehicleDetail.create({
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
    if (!vehicleDetail) throw new ValidationError('Vehicle details cannot be created.', 422);
    return GetVehicleDetailsByIdService.run(vehicleDetail.id);
  }
}

export default new CreateVehicleDetailsService();
