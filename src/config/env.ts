/* eslint-disable no-undef */

import dotenv from 'dotenv';

// Charger les variables 'environnement
dotenv.config();

export const config = {
  mongodb: {
    uri: process.env.MONGO_URI!,
    database: process.env.MONGO_DATABASE!,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION || '3600',
    accessRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '30d',
  },
  redis: {
    host: process.env.REDIS_HOST!,
    port: process.env.REDIS_PORT!,
  },
  server: {
    port: process.env.PORT || 9090,
    env: process.env.NODE_ENV || 'development',
    prefix: process.env.PREFIX_PATH || 'api/v1',
    log: process.env.LOG_LEVEL || 'info',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
  openai: {
    key: process.env.OPENAI_API_KEY,
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.MAIL_SECURE === 'true', // True pour SSL, False pour TLS
    user: process.env.MAIL_USER || 'your-email@example.com',
    password: process.env.MAIL_PASSWORD || 'your-email-password',
    senderName: process.env.MAIL_SENDER_NAME || 'Teleese Support',
  },
};
