import { Database } from '../graphql/utils/context';

interface VerificationCodeService {
  isVerified: (email: string) => Promise<boolean>;
  setVerificationCode: (email: string) => Promise<boolean>;
  verifyCode: (email: string, code: string) => Promise<boolean>;
}

const verificationCodeService = (db: Database): VerificationCodeService => {
  /**
   * Verification code expires after 15 minutes
   */
  const VERIFICATION_EXPIRY_MINUTES = 15;

  /**
   * Create a random 6 digit number as string
   */
  const generateCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const isVerified = async (email: string): Promise<boolean> => {
    const data = await db.verificationCode.findUnique({
      where: {
        email
      },
      select: {
        verified: true
      }
    });

    if (data === null) {
      return false;
    }

    return data.verified;
  };

  const isExpired = async (updatedAt: Date): Promise<boolean> => {
    const result = await db.$queryRaw<Array<{ now: string }>>`SELECT NOW() as now`;
    const databaseTime = new Date(result[0].now);
    const timeDiffInMinutes = (databaseTime.getTime() - updatedAt.getTime()) / 1000 / 60;
    return timeDiffInMinutes > VERIFICATION_EXPIRY_MINUTES;
  };

  // const sendVerificationEmail = async (email: string, code: string) => {
  //   const messageId = await emailService().sendEmail({
  //     email,
  //     subject: 'Verify your email',
  //     body: `ClubsNEU\nYour verification code is ${code}`
  //   });

  //   if (messageId === undefined) {
  //     throw new Error(`Failed to send verification email to ${email}`);
  //   }
  // };

  /**
   * Creates or updates a verification code for the given email.
   * If the email is already verified, an error is thrown.
   */
  const setVerificationCode = async (email: string) => {
    if (await isVerified(email)) {
      throw new Error(`Email ${email} is already verified`);
    }

    const newVerificationCode = generateCode();

    // TODO: Uncomment this when we can send to non-verifiable emails
    // await sendVerificationEmail(email, newVerificationCode);

    const data = await db.verificationCode.upsert({
      where: {
        email
      },
      update: {
        code: newVerificationCode
      },
      create: {
        email,
        code: newVerificationCode
      }
    });

    return data !== null;
  };

  const verifyCode = async (email: string, code: string) => {
    const verificationCode = await db.verificationCode.findFirst({
      where: {
        email
      }
    });

    if (verificationCode === null) {
      throw new Error(`Verification code not found for ${email}`);
    }

    const expired = await isExpired(verificationCode.updatedAt);
    const matches = verificationCode.code === code;
    const isValid = !expired && matches;

    if (isValid) {
      await db.verificationCode.update({
        where: {
          email
        },
        data: {
          verified: true
        }
      });
    }

    return isValid;
  };

  return {
    isVerified,
    setVerificationCode,
    verifyCode
  };
};

export default verificationCodeService;
