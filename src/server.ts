import Fastify from 'fastify';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifySwagger from '@fastify/swagger';
import fastifyRateLimit from '@fastify/rate-limit';
import { logger, loggerConfig } from '@config/logger';
import { GlobalException } from '@core/exceptions/GlobalException';
import { connectToDatabase } from '@config/database';
import { config } from '@config/env';
import { authenticate } from '@core/middlewares/authenticate';
import { authorize } from '@core/middlewares/authorize';
import { registerRoutes } from './routes';
import fastifyMultipart from '@fastify/multipart';
import path from 'path';
import fastifyStatic from '@fastify/static';
import cors from '@fastify/cors';
import metricsPlugin from 'fastify-metrics';

const fastify = Fastify({ logger: loggerConfig });

fastify.register(cors, {
    origin: true, // ou ["http://localhost:3000"]
    credentials: true, // si tu envoies un cookie ou Authorization
    allowedHeaders: ['Content-Type', 'Authorization'], // important
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
});

fastify.register(fastifyMultipart);

fastify.register(fastifyStatic, {
    root: path.join(path.resolve(), 'public'),
    prefix: '/',
});

// Hook lors de la réception d'une requête
fastify.addHook('onRequest', (req, reply, done) => {
    req.log.info(`📡 Requête reçue: ${req.method} ${req.url}`);
    done();
});

// Hook pour activer les logs onSend et onError dans Fastify
fastify.addHook('onSend', async (request, reply, payload) => {
    request.log.info(`[${request.method}] ${request.url} -> ${reply.statusCode}`);
    return payload;
});

fastify.setErrorHandler((error, request, reply) => {
    request.log.error({ err: error }, '❌ Erreur dans Fastify');
    reply.status(error.statusCode || 500).send({
        message: error.message,
    });
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
    routePrefix: `/${config.server.prefix}/docs`,
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

// Set du GlobalException
fastify.setErrorHandler(GlobalException);

// Décorateurs
fastify.decorate('authenticate', authenticate);
fastify.decorate('authorize', authorize);

// Enregistrement des metrics
fastify.register(metricsPlugin, {
    endpoint: '/metrics', // ⚡ Point d'accès pour Prometheus
});

export const startServer = async () => {
    try {
        // Connexion MongoDB
        await connectToDatabase();
        await registerRoutes(fastify);
        await fastify.listen({
            port: Number(config.server.port),
            host: '0.0.0.0', // 👈 autorise les connexions depuis toutes les interfaces réseau
        });
        logger.info(`Server running on ${config.server.baseUrl}`);
        return fastify;
    } catch (error) {
        logger.error('Erreur au démarrage de l’application', error);
        throw error;
    }
};
startServer();

export { fastify };
