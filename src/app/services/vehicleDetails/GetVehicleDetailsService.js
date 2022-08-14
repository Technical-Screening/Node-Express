import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetVehicleDetailsService {
  /**
   * Return all vehicle details list
   *
   * If you couldn't find vehicle detail, return 404 by default
   * @return {Array} vehicleDetail
   */
  async run() {
    const vehicleDetail = await prisma.vehicleDetail.findMany({
      where: {
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
    if (!vehicleDetail) throw new ValidationError('vehicle details cannot find.', 422);
    return vehicleDetail;
  }
}

export default new GetVehicleDetailsService();
