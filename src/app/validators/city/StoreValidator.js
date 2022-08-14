import * as Yup from 'yup';
import { defaultResponse, validate } from '../common/DefaultValidation';

/**
 * validate a city creation
 */
export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      addedBy: Yup.string().required(),
    });
    await validate(schema, req.body);
    return next();
  } catch (error) {
    return defaultResponse(res, error);
  }
};
