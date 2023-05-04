import { Res } from '.';
import { ErrorMessages } from '../constants';

interface TestResolvers {
  testAuthContext: Res<Promise<string>>;
}

const testResolvers: TestResolvers = {
  testAuthContext: async (_, __, ctx) => {
    if (ctx.user === null) {
      throw new Error(ErrorMessages.userNotAuthenticated);
    }

    return ctx.user.email;
  }
};

export default testResolvers;
