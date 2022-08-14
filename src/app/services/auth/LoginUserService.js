import bcrypt from 'bcrypt';
import { ValidationError } from 'yup';
import Jwt from '../../pkg/jwt';
import GetUserByEmailService from '../user/GetUserByEmailService';

class LoginUserService {
  /**
   * login a user
   * @param {Object} data
   * @return {String} token
   */
  async run(data) {
    const user = await GetUserByEmailService.run(data);
    const payload = {
      userId: user.id,
      email: data.email,
      name: user.name,
    };
    if (user && user.email === data.email && (await bcrypt.compare(data.password, user.password))) {
      user.token = Jwt.createToken(payload);
    }
    if (!user) throw new ValidationError('user details cannot found.', 404);
    return user.token;
  }
}

export default new LoginUserService();
