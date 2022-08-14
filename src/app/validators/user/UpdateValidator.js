import * as Yup from 'yup';
import { defaultResponse, validate } from '../common/DefaultValidation';

/**
 * validate a user update
 */
export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      bio: Yup.string().required(),
    });
    await validate(schema, req.body);
    return next();
  } catch (error) {
    return defaultResponse(res, error);
  }
};
