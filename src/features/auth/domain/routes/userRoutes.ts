import { FastifyInstance } from 'fastify';
import { keycloakAuthMiddleware } from '../middlewares/keycloakMiddleware';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', keycloakAuthMiddleware);
}
