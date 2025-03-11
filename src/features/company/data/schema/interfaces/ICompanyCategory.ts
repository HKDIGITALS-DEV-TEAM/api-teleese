import { IBaseEntity } from '@core/base/base-entity';

/**
 * Interface représentant une catégorie de compagnie.
 */
export interface ICompanyCategory extends IBaseEntity {
  name: string; // Nom de la catégorie
  description?: string; // Description optionnelle
}
