import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateCompanyRequest } from '@features/company/presentation/request/CreateCompanyRequest';
import { UpdateCompanyRequest } from '@features/company/presentation/request/UpdateCompanyRequest';
import { CompanyServiceImpl } from '../service/CompanyServiceImpl';

const companyService = new CompanyServiceImpl();

export class CompanyController {
  /**
   * @swagger
   * /company:
   *   post:
   *     summary: Créer une nouvelle compagnie
   *     tags: [Company]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       description: Données pour la création d'une compagnie
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateCompanyRequest'
   *     responses:
   *       201:
   *         description: Compagnie créée avec succès
   *       400:
   *         description: Erreur de validation
   */
  static async createCompany(req: FastifyRequest, res: FastifyReply) {
    try {
      const { name, description, category } = req.body as CreateCompanyRequest;
      const ownerId = (req as any).user.id as string;
      const company = await companyService.createCompany({ name, description, category }, ownerId);
      return res.status(201).send(company);
    } catch (error) {
      return res.status(400).send({ message: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /company/{companyId}:
   *   get:
   *     summary: Récupérer une compagnie par son ID
   *     tags: [Company]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: companyId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Détails de la compagnie
   *       404:
   *         description: Compagnie non trouvée
   */
  static async getCompany(req: FastifyRequest, res: FastifyReply) {
    try {
      const company = await companyService.getCompanyById((req as any).params.companyId as string);
      return res.status(200).send(company);
    } catch (error) {
      return res.status(404).send({ message: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /company/{companyId}:
   *   put:
   *     summary: Modifier une compagnie (Admin seulement)
   *     tags: [Company]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: companyId
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateCompanyRequest'
   *     responses:
   *       200:
   *         description: Compagnie mise à jour
   *       403:
   *         description: Accès interdit
   */
  static async updateCompany(req: FastifyRequest, res: FastifyReply) {
    try {
      const { name, description, category } = req.body as UpdateCompanyRequest;
      const company = await companyService.updateCompany((req as any).params.companyId as string, {
        name,
        description,
        category,
      });
      return res.status(200).send(company);
    } catch (error) {
      return res.status(403).send({ message: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /company/{companyId}:
   *   delete:
   *     summary: Supprimer une compagnie (Admin seulement)
   *     tags: [Company]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: companyId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Compagnie supprimée
   *       403:
   *         description: Accès interdit
   */
  static async deleteCompany(req: FastifyRequest, res: FastifyReply) {
    try {
      await companyService.deleteCompany((req as any).params.companyId as string);
      return res.status(200).send({ message: 'Compagnie supprimée avec succès' });
    } catch (error) {
      return res.status(403).send({ message: (error as Error).message });
    }
  }
}
