import { FastifyInstance } from 'fastify';
import { AuthController } from '../controller/AuthController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/register', AuthController.register);
  fastify.post('/auth/login', AuthController.login);
  fastify.post('/auth/refresh-token', AuthController.refreshToken);
  fastify.post('/auth/verify-email', AuthController.verifyEmail);
  fastify.post('/auth/reset-password', AuthController.resetPassword);
  fastify.get('/auth/me', { preHandler: [AuthMiddleware] }, AuthController.getProfile);
  fastify.post(
    '/auth/change-password',
    { preHandler: [AuthMiddleware] },
    AuthController.changePassword
  );
}
