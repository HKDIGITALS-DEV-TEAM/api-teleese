/* eslint-disable no-unused-vars */
import { ICompanyCategory } from '@features/company/data/schema/interfaces/ICompanyCategory';

/**
 * Interface du DAO pour la gestion des catégories de compagnie.
 */
export interface ICompanyCategoryDAO {
  /**
   * Crée une nouvelle catégorie de compagnie.
   * @param category - Données de la catégorie.
   * @returns La catégorie créée.
   */
  create(category: Partial<ICompanyCategory>): Promise<ICompanyCategory>;

  /**
   * Trouve une catégorie par son ID.
   * @param categoryId - L'ID de la catégorie.
   * @returns La catégorie trouvée ou null.
   */
  findById(categoryId: string): Promise<ICompanyCategory | null>;

  /**
   * Trouve une catégorie par son nom.
   * @param name - Le nom de la catégorie.
   * @returns La catégorie trouvée ou null.
   */
  findByName(name: string): Promise<ICompanyCategory | null>;
}
