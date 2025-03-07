/* eslint-disable no-undef */

import Redis from 'ioredis';
import { config } from './env';

export const redis =
  config.server.env === 'development' || config.server.env === 'uat'
    ? {
        get: jest.fn().mockResolvedValue(null),
        set: jest.fn(),
        del: jest.fn(),
        quit: jest.fn(),
      }
    : new Redis({
        host: config.regis.host,
        port: Number(config.regis.port),
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false,
      });
