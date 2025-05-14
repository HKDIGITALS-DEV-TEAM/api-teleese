import { FastifyInstance } from 'fastify';
import { AuthController } from '../controller/AuthController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import {
    UserRoleSchema,
    CompanyRoleSchema,
    RegisterRequestSchema,
    authSchemas,
    UserLoginSchema,
} from '@config/swaggerSchemas';

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.addSchema(UserRoleSchema);
    fastify.addSchema(CompanyRoleSchema);
    fastify.addSchema(RegisterRequestSchema);
    fastify.addSchema(UserLoginSchema);

    fastify.post('/auth/register', { schema: authSchemas.register }, AuthController.register);
    fastify.post('/auth/login', { schema: authSchemas.login }, AuthController.login);
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
