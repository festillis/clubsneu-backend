/* eslint-disable @typescript-eslint/no-empty-interface */
declare interface EnvVars {
  // ENVIRONMENT
  NODE_ENV: 'development' | 'production';

  // AWS
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  SENDER_EMAIL: string;

  // FIREBASE ADMIN
  FIREBASE_ADMIN_PROJECT_ID: string;
  FIREBASE_ADMIN_CLIENT_EMAIL: string;
  FIREBASE_ADMIN_PRIVATE_KEY: string;

  // GRAPHQL
  ENABLE_GRAPHQL_DEV_ENV: string;
  GRAPHQL_PORT: string;
  GRAPHQL_ENDPOINT: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvVars {}
}
