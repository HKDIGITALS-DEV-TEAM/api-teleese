/* eslint-disable no-undef */

import Fastify from 'fastify';
import userRoutes from './features/auth/domain/routes/userRoutes';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifySwagger from '@fastify/swagger';
import fastifyRateLimit from '@fastify/rate-limit';
import { logger, loggerConfig } from './config/logger';
import { GlobalException } from './core/exceptions/GlobalException';
import fastifySession from '@fastify/session';
import { connectToDatabase } from '@config/database';
import { config } from '@config/env';
import fastifyCookie from '@fastify/cookie';
import { companyRoutes } from '@features/company/domain/controller/CompanyController';

const fastify = Fastify({ logger: loggerConfig });

// Ajout du support des cookies (nécessaire pour Fastify-Session)
fastify.register(fastifyCookie);

// Configuration de Fastify-Session
fastify.register(fastifySession, {
  secret: config.server.secret,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
  },
  saveUninitialized: false,
});

fastify.addHook('onRequest', (req, reply, done) => {
  req.log.info(`📡 Requête reçue: ${req.method} ${req.url}`);
  done();
});

// Enregistrement de Swagger
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Teleese API',
      description: 'API documentation',
      version: '1.0.0',
    },
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Ajoutez "Bearer <TOKEN>" pour s\'authentifier.',
      },
    },
  },
});
fastify.register(fastifySwaggerUi, {
  routePrefix: `${config.server.prefix}/docs`,
});

// Limitation de requêtes (100 par minute)
fastify.register(fastifyRateLimit, {
  max: 100,
  timeWindow: '1 minute',
  cache: 10000,
  keyGenerator: (req) => req.ip,
  allowList: ['127.0.0.1'],
  errorResponseBuilder: (req, context) => ({
    statusCode: 429,
    error: 'Too Many Requests',
    message: `Vous avez dépassé la limite de ${context.max} requêtes par minute.`,
  }),
});

// Enregistrement des routes
fastify.register(userRoutes, { prefix: '/api/v1' });
fastify.register(companyRoutes, { prefix: '/api/v1' });

fastify.setErrorHandler(GlobalException);

export const startServer = async () => {
  try {
    // Connexion MongoDB
    await connectToDatabase();

    await fastify.listen({ port: config.server.port });
    logger.info('Server running');
    return fastify;
  } catch (error) {
    logger.error(error);
    if (config.server.env === 'production') process.exit(1);
  }
};

startServer();

export { fastify };
