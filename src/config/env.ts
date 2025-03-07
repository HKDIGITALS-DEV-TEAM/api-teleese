/* eslint-disable no-undef */

import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

export const config = {
  keycloak: {
    serverUrl: process.env.KEYCLOAK_SERVER_URL!,
    realm: process.env.KEYCLOAK_REALM!,
    clientId: process.env.KEYCLOAK_CLIENT_ID!,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
    redirectUri: process.env.KEYCLOAK_REDIRECT_URI!,
  },
  mongodb: {
    uri: process.env.MONGO_URI!,
    database: process.env.MONGO_DATABASE!,
  },
  security: {
    sessionSecret: process.env.SESSION_SECRET!,
  },
  regis: {
    host: process.env.REDIS_HOST!,
    port: process.env.REDIS_PORT!,
  },
  server: {
    port: parseInt(process.env.PORT || '5000'),
    env: process.env.NODE_ENV || 'development',
    prefix: process.env.PREFIX_PATH || 'api/v1',
    log: process.env.LOG_LEVEL || 'info',
  },
};
