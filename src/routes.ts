// routes.ts
import { FastifyInstance } from 'fastify';
import userRoutes from '@features/auth/domain/routes/userRoutes';
import companyRoutes from '@features/company/domain/routes/companyRoutes';
import { config } from '@config/env';

export const registerRoutes = async (app: FastifyInstance) => {
  app.register(userRoutes, { prefix: `/${config.server.prefix}` });
  app.register(companyRoutes, { prefix: `/${config.server.prefix}` });
};
