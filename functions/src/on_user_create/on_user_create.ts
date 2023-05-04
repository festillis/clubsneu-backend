import * as functions from 'firebase-functions';

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const { email } = user;

  if (email === undefined) {
    throw new Error('User must have an email');
  }

  console.log('Created user', email);
});
