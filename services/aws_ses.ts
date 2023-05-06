import { SESv2Client, SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-sesv2';

interface SendEmailInput {
  email: string;
  subject: string;
  body: string;
}

interface EmailService {
  sendEmail: (input: SendEmailInput) => Promise<string | undefined>;
}

const emailService = (ses: SESv2Client): EmailService => {
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

  const sendEmail = async (input: SendEmailInput) => {
    const { email, subject, body } = input;
    const command = new SendEmailCommand(getParams(email, subject, body));
    const response = await ses.send(command);
    return response.MessageId;
  };

  return {
    sendEmail
  };
};

export default emailService;
