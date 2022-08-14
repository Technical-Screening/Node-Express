import * as Yup from 'yup';
import { defaultResponse, validate } from '../common/DefaultValidation';

const { usersLogger } = require('../../utils/logger');

/**
 * validate a vehicle condition update
 */
export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      condition: Yup.string().required(),
    });
    await validate(schema, req.body);
    return next();
  } catch (error) {
    usersLogger.error(`Validation error: ${error}`);
    return defaultResponse(res, error);
  }
};
