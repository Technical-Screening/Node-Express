import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetUserByEmailService {
  /**
     * Return user detail by email
     *
     * If this user wasn't found, return 404 by default
     * @param {Object} req
     * @return {Object} user
     */
  async run(req) {
    const user = await prisma.user.findFirst({
      where: {
        email: req.email,
        deleted: false,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
      },
    });
    if (!user) throw new ValidationError('user not found', 404);
    return user;
  }
}

export default new GetUserByEmailService();
