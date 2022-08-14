import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class GetUserDetailsByIdService {
  /**
   * Return user details by id
   *
   * If this user wasn't found, return 404 by default
   * @param {String} id
   * @return {Object} user
   */
  async run(id) {
    const user = await prisma.user.findFirst({
      where: {
        id,
        deleted: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    if (!user) throw new ValidationError('user not found', 404);
    return user;
  }
}

export default new GetUserDetailsByIdService();
