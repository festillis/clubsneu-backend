import { SESv2Client, SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-sesv2';
import { loadEnv } from '../utils';

loadEnv();

const ses = new SESv2Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  region: process.env.AWS_REGION
});

interface EmailService {
  sendEmail: ({
    email,
    subject,
    body
  }: {
    email: string;
    subject: string;
    body: string;
  }) => Promise<string | undefined>;
}

const emailService = (): EmailService => {
  const getParams = (email: string, subject: string, body: string): SendEmailCommandInput => {
    return {
      FromEmailAddress: process.env.SENDER_EMAIL,
      Destination: {
        ToAddresses: [email]
      },
      Content: {
        Simple: {
          Body: {
            Text: {
              Data: body
            }
          },
          Subject: {
            Data: subject
          }
        }
      }
    };
  };

  const sendEmail = async ({
    email,
    subject,
    body
  }: {
    email: string;
    subject: string;
    body: string;
  }) => {
    const command = new SendEmailCommand(getParams(email, subject, body));
    const response = await ses.send(command);
    return response.MessageId;
  };

  return {
    sendEmail
  };
};

export default emailService;
