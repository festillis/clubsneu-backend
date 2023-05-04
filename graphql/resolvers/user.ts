import { userService, verificationCodeService } from '../../services';
import type { User } from '../generated/graphql';
import { Res } from '.';
import { ErrorMessages } from '../constants';

interface UserResolvers {
  user: Res<Promise<User | null>>;
  createUser: Res<Promise<User>>;
}

const userResolvers: UserResolvers = {
  user: async (_, __, ctx) => {
    return ctx.user;
  },

  createUser: async (_, __, ctx) => {
    const { db, user } = ctx;
    if (user === null) {
      throw new Error(ErrorMessages.userNotAuthenticated);
    }

    const { id, email } = user;
    if (!verificationCodeService(db).isVerified(email)) {
      throw new Error('Email not verified');
    }

    return await userService(db).createUser(id, email);
  }
};

export default userResolvers;
