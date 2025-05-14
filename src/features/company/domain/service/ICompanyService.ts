/* eslint-disable no-unused-vars */

import { ICompany } from '@features/company/data/schema/interfaces/ICompany';
import { CreateCompanyRequest } from '@features/company/presentation/payload/CreateCompanyRequest';
import { UpdateCompanyRequest } from '@features/company/presentation/payload/UpdateCompanyRequest';

/**
 * Interface du service de gestion des compagnies.
 */
export interface ICompanyService {
    /**
     * Crée une nouvelle compagnie.
     * @param request - Données de la compagnie à créer.
     * @param ownerId - Identifiant de l'utilisateur créateur.
     * @returns La compagnie créée.
     */
    createCompany(request: CreateCompanyRequest, ownerId: string): Promise<ICompany>;

    /**
     * Récupère une compagnie par son ID.
     * @param companyId - Identifiant de la compagnie.
     * @returns La compagnie trouvée ou null.
     */
    getCompanyById(companyId: string): Promise<ICompany | null>;

    /**
     * Met à jour les informations d'une compagnie.
     * @param companyId - Identifiant de la compagnie.
     * @param request - Données à mettre à jour.
     * @returns La compagnie mise à jour.
     */
    updateCompany(companyId: string, request: UpdateCompanyRequest): Promise<ICompany | null>;

    /**
     * Supprime une compagnie.
     * @param companyId - Identifiant de la compagnie.
     * @returns Un booléen indiquant si la suppression a réussi.
     */
    deleteCompany(companyId: string): Promise<boolean>;
    /**
     * Met à jour les configurations d'une compagnie.
     * @param companyId - ID de la compagnie
     * @param configurations - Nouvelles configurations
     * @returns La compagnie mise à jour
     */
    updateCompanyConfigurations(
        companyId: string,
        configurations: Record<string, any>
    ): Promise<ICompany | null>;

    /**
     * Met à jour les options IA d'une compagnie.
     * @param companyId - ID de la compagnie
     * @param aiOptions - Nouvelles options IA
     * @returns La compagnie mise à jour
     */
    updateCompanyAIOptions(
        companyId: string,
        aiOptions: Record<string, any>[]
    ): Promise<ICompany | null>;
}
