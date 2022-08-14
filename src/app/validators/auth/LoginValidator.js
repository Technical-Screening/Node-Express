import * as Yup from 'yup';
import { defaultResponse, validate } from '../common/DefaultValidation';

/**
 * Validate a authentication payload
 */
export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    });
    await validate(schema, req.body);
    return next();
  } catch (error) {
    return defaultResponse(res, error);
  }
};
