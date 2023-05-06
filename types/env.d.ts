/* eslint-disable @typescript-eslint/no-empty-interface */
declare interface EnvVars {
  // ENVIRONMENT
  readonly NODE_ENV: 'development' | 'production';

  // AWS
  readonly AWS_REGION: string;
  readonly AWS_ACCESS_KEY_ID: string;
  readonly AWS_SECRET_ACCESS_KEY: string;
  readonly SENDER_EMAIL: string;

  // FIREBASE ADMIN
  readonly FIREBASE_ADMIN_PROJECT_ID: string;
  readonly FIREBASE_ADMIN_CLIENT_EMAIL: string;
  readonly FIREBASE_ADMIN_PRIVATE_KEY: string;

  // GRAPHQL
  readonly ENABLE_GRAPHQL_DEV_ENV: string;
  readonly GRAPHQL_PORT: string;
  readonly GRAPHQL_ENDPOINT: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvVars {}
}
