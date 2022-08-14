import * as Yup from 'yup';
import { defaultResponse, validate } from '../common/DefaultValidation';

const { usersLogger } = require('../../utils/logger');

/**
 * validate a city creation
 */
export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      vehicleMake: Yup.string().required(),
    });
    await validate(schema, req.body);
    return next();
  } catch (error) {
    usersLogger.error(`Validation error: ${error}`);
    return defaultResponse(res, error);
  }
};
