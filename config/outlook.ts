import { loadEnv } from '../utils';

loadEnv();

export interface AppSettings {
  clientId: string;
  tenantId: string;
  graphUserScopes: string[];
}

const settings: AppSettings = {
  clientId: process.env.MICROSOFT_CLIENT_ID,
  tenantId: process.env.MICROSOFT_TENANT_ID,
  graphUserScopes: ['user.read', 'mail.read', 'mail.send']
};

export default settings;
