/* eslint-disable no-unused-vars */
import { IRole } from '@features/auth/data/schema/interfaces/IRole';

/**
 * Interface pour la gestion des rôles en base de données.
 */
export interface IRoleDAO {
    findByName(name: string): Promise<IRole | null>;
    create(role: Partial<IRole>): Promise<IRole>;
}
