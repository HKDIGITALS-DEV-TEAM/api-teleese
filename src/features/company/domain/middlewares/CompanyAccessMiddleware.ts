import { FastifyRequest, FastifyReply } from 'fastify';
import { CompanyServiceImpl } from '../service/CompanyServiceImpl';
import { logger } from '@config/logger';

const companyService = new CompanyServiceImpl();

/**
 * Middleware pour vérifier si l'utilisateur appartient à une compagnie et s'il est admin.
 */
export async function CompanyAccessMiddleware(req: FastifyRequest, res: FastifyReply) {
    try {
        const userId = (req as any).user.id as string;
        const companyId = (req as any).params.companyId as string;

        if (!companyId) {
            return res.status(400).send({ message: "L'ID de la compagnie est requis." });
        }

        const company = await companyService.getCompanyById(companyId);

        if (!company) {
            return res.status(404).send({ message: 'Compagnie non trouvée' });
        }

        const userRole = company.users.find((u) => u.user.id.toString() === userId)?.role;

        if (!userRole) {
            logger.info(
                `Accès refusé : L'utilisateur ${userId} n'appartient pas à la compagnie ${companyId}`
            );
            return res
                .status(403)
                .send({ message: 'Accès refusé, vous ne faites pas partie de cette compagnie' });
        }

        // Vérification des permissions ADMIN uniquement pour modification/suppression
        const isUpdateOrDelete = req.raw.url?.includes('update') || req.raw.url?.includes('delete');

        if (isUpdateOrDelete && userRole !== 'admin') {
            logger.info(
                `Accès refusé : L'utilisateur ${userId} n'est pas admin de la compagnie ${companyId}`
            );
            return res.status(403).send({
                message:
                    'Accès refusé, seuls les administrateurs peuvent modifier ou supprimer la compagnie',
            });
        }

        return;
    } catch (error) {
        logger.error('Erreur dans CompanyAccessMiddleware:', error);
        return res.status(500).send({ message: 'Erreur interne du serveur' });
    }
}
