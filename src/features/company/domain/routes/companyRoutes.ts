import { FastifyInstance } from 'fastify';
import { CompanyController } from '../controller/CompanyController';
import { AuthMiddleware } from '@features/auth/domain/middlewares/AuthMiddleware';
import { CompanyAccessMiddleware } from '../middlewares/CompanyAccessMiddleware';

export default async function companyRoutes(fastify: FastifyInstance) {
    fastify.post('/company', { preHandler: [AuthMiddleware] }, CompanyController.createCompany);
    fastify.get(
        '/company/:companyId',
        {
            preHandler: [AuthMiddleware, CompanyAccessMiddleware],
        },
        CompanyController.getCompany
    );
    fastify.put(
        '/company/:companyId',
        { preHandler: [AuthMiddleware, CompanyAccessMiddleware] },
        CompanyController.updateCompany
    );
    fastify.delete(
        '/company/:companyId',
        { preHandler: [AuthMiddleware, CompanyAccessMiddleware] },
        CompanyController.deleteCompany
    );
}
