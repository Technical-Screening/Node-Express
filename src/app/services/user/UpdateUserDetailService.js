import { ValidationError } from 'yup';
import prisma from '../../configs/db-client';
import GetUserDetailsByIdService from './GetUserDetailsByIdService';

class UpdateUserDetailService {
  /**
    * update user details based on id
    * @param {String} id
    * @param {Object} data
    * @returns {Object} userById
    */
  async run(id, { id: _, ...data }) {
    const user = await prisma.user.updateMany({
      where: {
        id,
        deleted: false,
      },
      data: {
        email: data.email,
        name: data.name,
      },
    });
    if (!user) throw new ValidationError('user details cannot be updated.', 422);
    const profile = await prisma.profile.updateMany({
      where: {
        deleted: false,
        userId: user.id,
      },
      data: {
        bio: data.bio,
      },
    });
    if (!profile) throw new ValidationError('profile details cannot be updated.', 422);
    return GetUserDetailsByIdService.run(id);
  }
}

export default new UpdateUserDetailService();
