import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetVehicleDetailsByIdService {
  /**
   * Return vehicle details by id
   *
   * If you couldn't find vehicle details, return 404 by default
   * @param {String} id
   * @param {Object} vehicleDetail
   */
  async run(id) {
    const vehicleDetail = await prisma.vehicleDetail.findFirst({
      where: {
        id,
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        contact: true,
        city: {
          select: {
            name: true,
          },
        },
        vehicleType: {
          select: {
            vehicleType: true,
          },
        },
        vehicleCondition: {
          select: {
            condition: true,
          },
        },
        vehicleMake: {
          select: {
            vehicleMake: true,
          },
        },
        model: true,
        isPublished: true,
        slug: true,
        manufactureYear: true,
        price: true,
        ongoingLease: true,
        transmission: {
          select: {
            name: true,
          },
        },
        fuelType: {
          select: {
            fuelType: true,
          },
        },
        engineCapacity: true,
        milage: true,
        vehicleOptions: {
          select: {
            vehicleOption: true,
          },
        },
        info: true,
        user: {
          select: {
            id: true,
          },
        },
        createdAt: true,
      },
    });
    if (!vehicleDetail) throw new ValidationError(`vehicle details for id ${id} has no details.`, 422);
    return vehicleDetail;
  }
}

export default new GetVehicleDetailsByIdService();
