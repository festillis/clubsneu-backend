import * as functions from 'firebase-functions';

export const onUserDelete = functions.auth.user().onDelete(async (user) => {
  const { email } = user;

  console.log('Deleted user', email);
});
