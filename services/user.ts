import { User } from '../graphql/generated/graphql';
import { Database } from '../graphql/utils/context';

interface UserService {
  getUser(id: string): Promise<User | undefined>;
  createUser(id: string, email: string): Promise<User>;
}

const userService = (db: Database): UserService => {
  const getUser = async (id: string): Promise<User | null> => {
    return await db.user.findUnique({
      where: { id }
    });
  };

  const createUser = async (id: string, email: string): Promise<User> => {
    return await db.user.create({
      data: {
        id,
        email
      }
    });
  };

  return {
    createUser,
    getUser
  };
};

export default userService;
