import * as admin from 'firebase-admin';
import type { PrismaClient } from '@prisma/client';
import { YogaInitialContext } from 'graphql-yoga';
import { prisma } from '../../prisma';
import { Headers } from '../constants';
import { loadEnv } from '../../utils';

loadEnv();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
  })
});

export type Database = PrismaClient;

interface UserContext {
  id: string;
  email: string;
}

export interface GraphQLContext {
  db: Database;
  user: UserContext | null;
}

const getUserContext = async (request: Request): Promise<UserContext | null> => {
  const header = request.headers.get(Headers.authorization);

  if (header === null) {
    return null;
  }

  try {
    const token = header.split(' ')[1];
    const decodedIdToken = await admin.auth().verifyIdToken(token);
    const id = decodedIdToken.uid;
    const email = decodedIdToken.email;

    return { id, email };
  } catch (error) {
    return null;
  }
};

const createContext = async (initialContext: YogaInitialContext): Promise<GraphQLContext> => {
  return {
    db: prisma,
    user: await getUserContext(initialContext.request)
  };
};

export default createContext;
