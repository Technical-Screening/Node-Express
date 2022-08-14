import { ValidationError } from 'yup';
import Jwt from '../../pkg/jwt';
import prisma from '../../configs/db-client';
import GetUserDetailsByIdService from './GetUserDetailsByIdService';

class CreateUserDetailService {
  /**
   * create new user
   * create new profile related to the created user id
   * @param {Object} data
   * @param {Response} res
   * @returns {Object} userById
   */
  async run(data, res) {
    const hashedPassword = await Jwt.convertToHashedPassword(data.password, res);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
    if (!user) throw new ValidationError('user details cannot created.', 422);
    const profile = await prisma.profile.create({
      data: {
        bio: data.bio,
        userId: user.id,
      },
    });
    if (!profile) throw new ValidationError('profile details cannot created.', 422);
    return GetUserDetailsByIdService.run(user.id);
  }
}

export default new CreateUserDetailService();
