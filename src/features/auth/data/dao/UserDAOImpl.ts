import { IUser } from '../schema/interfaces/IUser';
import { User } from '../schema/user-schema';
import { IUserDAO } from './IUserDAO';

/**
 * Implémentation du DAO utilisateur.
 */
export class UserDAOImpl implements IUserDAO {
  async create(user: Partial<IUser>): Promise<IUser> {
    return await User.create(user);
  }

  async findByKeycloakId(keycloakId: string): Promise<IUser | null> {
    return await User.findOne({ keycloakId });
  }
}
