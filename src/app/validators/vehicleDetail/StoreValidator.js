import * as Yup from 'yup';
import { usersLogger } from '../../utils/logger';
import { defaultResponse, validate } from '../common/DefaultValidation';

/**
 * validate a vehicle detail
 */
export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      contact: Yup.string().required(),
      cityId: Yup.string().required(),
      vehicleTypeId: Yup.string().required(),
      vehicleConditionId: Yup.string().required(),
      vehicleMakeId: Yup.string().required(),
      model: Yup.string().required(),
      manufactureYear: Yup.string().required(),
      price: Yup.string().required(),
      ongoingLease: Yup.boolean().required(),
      transmissionId: Yup.string().required(),
      fuelTypeId: Yup.string().required(),
      engineCapacity: Yup.string().required(),
      milage: Yup.number().required(),
      vehicleOptionsId: Yup.string().required(),
      info: Yup.string().required(),
      addedBy: Yup.string().required(),
    });
    await validate(schema, req.body);
    return next();
  } catch (error) {
    usersLogger.error(`Validation error: ${error}`);
    return defaultResponse(res, error);
  }
};
