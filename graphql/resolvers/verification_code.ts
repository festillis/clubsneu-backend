import { Res } from '.';
import { verificationCodeService } from '../../services';

interface VerificationCodeResolvers {
  setVerificationCode: Res<Promise<boolean>, { email: string }>;
  verifyCode: Res<Promise<boolean>, { email: string; code: string }>;
}

const verificationCodeResolvers: VerificationCodeResolvers = {
  setVerificationCode: async (_, { email }, ctx) => {
    return await verificationCodeService(ctx.db).setVerificationCode(email);
  },
  verifyCode: async (_, { email, code }, ctx) => {
    return await verificationCodeService(ctx.db).verifyCode(email, code);
  }
};

export default verificationCodeResolvers;
