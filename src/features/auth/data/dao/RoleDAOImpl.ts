import { Role } from '../schema/role-schema';
import { IRoleDAO } from './IRoleDAO';
import { IRole } from '@features/auth/data/schema/interfaces/IRole';

/**
 * Implémentation de la DAO pour les rôles.
 */
export class RoleDAOImpl implements IRoleDAO {
  async findByName(name: string): Promise<IRole | null> {
    return await Role.findOne({ name }).exec();
  }

  async create(role: Partial<IRole>): Promise<IRole> {
    return await Role.create(role);
  }
}
