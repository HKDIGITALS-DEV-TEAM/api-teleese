import { IBaseEntity } from '@core/base/base-entity';
import { ICompanyCategory } from './ICompanyCategory';
import { IUser } from '@features/auth/data/schema/interfaces/IUser';

/**
 * Interface représentant une compagnie.
 */
export interface ICompany extends IBaseEntity {
    owner: IUser; // ID du créateur de la compagnie
    name: string; // Nom de la compagnie
    description: string; // Description
    category: ICompanyCategory; // Référence vers la catégorie de la compagnie
    users: { user: IUser; role: string }[]; // Liste des utilisateurs et leurs rôles
    configurations?: Record<string, any>; // Configurations spécifiques (Ajoutées plus tard)
    aiOptions?: Record<string, any>[]; // Options IA ajoutées après
}
