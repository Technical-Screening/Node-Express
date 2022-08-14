import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class UserDetailsService {
  /**
  * Return list of users
  *
  * If this user wasn't found, return 404 by default
  * @return {Array} users
  */
  async run() {
    const users = await prisma.user.findMany({
      where: {
        deleted: false,
      },
      select: {
        email: true,
        name: true,
      },
    });
    if (!users) throw new ValidationError('user details cannot be found', 422);
    return users;
  }
}

export default new UserDetailsService();
