import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';

class DeleteUserDetailService {
  /**
     * Delete a user
     * @param {String} id
     * @return {Object} message
     */
  async run(id) {
    const profile = await prisma.profile.updateMany({
      where: {
        userId: id,
        deleted: false,
      },
      data: {
        deleted: true,
      },
    });

    if (!profile) throw new ValidationError('profile details cannot be deleted.', 422);
    const user = await prisma.user.updateMany({
      where: {
        id,
        deleted: false,
      },
      data: {
        deleted: true,
      },
    });

    if (!user) throw new ValidationError('user details cannot be deleted.', 422);
    return { message: `user name ${user.name} deleted successfully.` };
  }
}

export default new DeleteUserDetailService();
