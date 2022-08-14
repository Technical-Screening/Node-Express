import { ValidationError } from 'yup';

const { serviceLogger } = require('./logger');

class ControllerUtils {
  /**
     * Default response handler pattern
     * when the promise resulted in a exception, we validate if is a controlled
     * exception or a not known exception (returning the right response or passing)
     * the treatment to app http 500 default handling).
     * @param {Response} res
     * @param {Promise} promise promise started
     */
  async defaultHandler(res, promise) {
    try {
      const data = await promise;
      if (data) return res.status(200).json(data);
      return res.status(204).send();
    } catch (error) {
      serviceLogger.error(`Service error: ${error}`);
      if (error instanceof ValidationError) {
        return res.status(error.code).json({ error: error.message });
      }
      throw error;
    }
  }
}

export default ControllerUtils;
