import { IBaseEntity } from '@core/base/base-entity';

/**
 * Interface représentant une catégorie de compagnie.
 */
export interface ICallResource extends IBaseEntity {
    resource_id: string; // Nom de la catégorie
    phone_number: string; // Numéro de téléphone
    description: string; // Nom de la catégorie
    company_id: string; // ID de la compagnie
}
