import { ValidationError } from 'yup';
import ControllerUtils from '../utils/ControllerUtil';
import GetUserByEmailService from '../services/user/GetUserByEmailService';
import Jwt from '../pkg/jwt';
import LoginUserService from '../services/auth/LoginUserService';

class LogInController extends ControllerUtils {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  /**
     * login user using email and password
     * @param {Request} req
     * @param {Response} res
     */
  async login(req, res) {
    const user = await GetUserByEmailService.run(req.body);

    // eslint-disable-next-line max-len
    const comparePasswords = Jwt.comparePasswordAndOldPassword(req.body.password, user.password, res);
    if (user && comparePasswords) {
      const token = await (async () => LoginUserService.run(req.body))();
      return res.json({ token });
    }
    if (!user || !comparePasswords) throw new ValidationError('user cannot find', 404);
    return res.json({ message: 'invalid credentials', status: 401 });
  }
}

export default new LogInController();
