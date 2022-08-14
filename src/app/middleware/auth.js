/** verify token before access a route */
import Jwt from '../pkg/jwt';
import { defaultResponse } from '../validators/common/DefaultValidation';

class AuthenticationMiddleware {
  /** get token by body or header */
  async veriftToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      return defaultResponse(res, 'token is not valid');
    }
    try {
      const decode = await Jwt.verifyToken(token);
      req.user = decode;
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }
    return next();
  }
}

export default new AuthenticationMiddleware();
