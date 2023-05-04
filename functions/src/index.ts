import * as admin from 'firebase-admin';
import { onUserCreate } from './on_user_create';
import { onUserDelete } from './on_user_delete';

admin.initializeApp();

export const on_user_create = onUserCreate;
export const on_user_delete = onUserDelete;
