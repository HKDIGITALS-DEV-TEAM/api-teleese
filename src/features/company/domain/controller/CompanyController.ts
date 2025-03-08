import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ICompanyService } from '@features/company/domain/service/ICompanyService';
import { CompanyServiceImpl } from '@features/company/domain/service/CompanyServiceImpl';
import { validateOrReject } from 'class-validator';
import { CompanyDAOImpl } from '@features/company/data/dao/CompanyDAOImpl';
import { CompanyRequest } from '@features/company/presentation/request/CompanyRequest';
import { generateCompanyQuestions } from '@infrastructure/ai/CompanyAIService';

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Gestion des entreprises
 */
export function companyRoutes(fastify: FastifyInstance) {
  const companyService: ICompanyService = new CompanyServiceImpl(new CompanyDAOImpl());

  /**
   * @swagger
   * /company:
   *   post:
   *     summary: Crée une nouvelle entreprise
   *     tags: [Company]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CompanyRequest'
   *     responses:
   *       201:
   *         description: Entreprise créée avec succès.
   */
  fastify.post('/company', async (request, reply) => {
    try {
      const companyData = Object.assign(new CompanyRequest(), request.body);
      await validateOrReject(companyData);

      const company = await companyService.createCompany(companyData);
      reply.status(201).send(company);
    } catch (error) {
      const err = error as Error;
      reply.status(400).send({ message: err.message });
    }
  });

  /**
   * @swagger
   * /company/{id}:
   *   get:
   *     summary: Récupère une entreprise par ID
   *     tags: [Company]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: L'ID de l'entreprise
   *     responses:
   *       200:
   *         description: Détails de l'entreprise
   *       404:
   *         description: Entreprise non trouvée
   */
  fastify.get<{ Params: { id: string } }>('/company/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const company = await companyService.getCompanyById(id);
      if (!company) {
        return reply.status(404).send({ message: 'Entreprise non trouvée' });
      }
      reply.status(200).send(company);
    } catch (error) {
      const err = error as Error;
      reply.status(400).send({ message: err.message });
    }
  });

  /**
   * @swagger
   * /api/v1/company/questions/{type}:
   *   get:
   *     summary: Récupérer les questions IA pour la création d'une entreprise
   *     tags: [Company]
   *     parameters:
   *       - in: path
   *         name: type
   *         required: true
   *         schema:
   *           type: string
   *         description: Type d'entreprise (restaurant, hotel, etc.)
   *     responses:
   *       200:
   *         description: Liste des questions générées
   *       400:
   *         description: Erreur lors de la récupération des questions
   */
  fastify.get<{ Params: { type: string } }>(
    '/api/v1/company/questions/:type',
    async (request: FastifyRequest<{ Params: { type: string } }>, reply: FastifyReply) => {
      try {
        const { type } = request.params;
        const questions = generateCompanyQuestions(type);
        return reply.status(200).send({ questions });
      } catch (error) {
        return reply.status(400).send({ message: (error as Error).message });
      }
    }
  );
}
