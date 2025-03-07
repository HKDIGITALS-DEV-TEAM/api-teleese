/* eslint-disable no-unused-vars */
import { IUser } from '../schema/interfaces/IUser';

/**
 * Interface définissant les opérations DAO pour les utilisateurs.
 */
export interface IUserDAO {
  create(user: Partial<IUser>): Promise<IUser>;
  findByKeycloakId(keycloakId: string): Promise<IUser | null>;
}
