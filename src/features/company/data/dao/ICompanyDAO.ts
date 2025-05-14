/* eslint-disable no-unused-vars */
import { ICompany } from '@features/company/data/schema/interfaces/ICompany';

/**
 * Interface du DAO pour la gestion des compagnies.
 */
export interface ICompanyDAO {
    /**
     * Crée une nouvelle compagnie.
     * @param company - Données de la compagnie à créer.
     * @returns La compagnie créée.
     */
    create(company: Partial<ICompany>): Promise<ICompany>;

    /**
     * Trouve une compagnie par son ID.
     * @param companyId - L'ID de la compagnie.
     * @returns La compagnie trouvée ou null.
     */
    findById(companyId: string): Promise<ICompany | null>;

    /**
     * Trouve une compagnie par son nom.
     * @param name - Le nom de la compagnie.
     * @returns La compagnie trouvée ou null.
     */
    findByName(name: string): Promise<ICompany | null>;

    /**
     * Met à jour une compagnie.
     * @param companyId - L'ID de la compagnie à mettre à jour.
     * @param updateData - Les données à mettre à jour.
     * @returns La compagnie mise à jour.
     */
    update(companyId: string, updateData: Partial<ICompany>): Promise<ICompany | null>;

    /**
     * Supprime une compagnie.
     * @param companyId - L'ID de la compagnie à supprimer.
     * @returns Un booléen indiquant si la suppression a réussi.
     */
    delete(companyId: string): Promise<boolean>;
}
