import * as Yup from 'yup';
import { usersLogger } from '../../utils/logger';
import { defaultResponse, validate } from '../common/DefaultValidation';

/**
 * validate a city creation
 */
export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      vehicleType: Yup.string().required(),
      addedBy: Yup.string().required(),
    });
    await validate(schema, req.body);
    return next();
  } catch (error) {
    usersLogger.error(`Validation error: ${error}`);
    return defaultResponse(res, error);
  }
};
