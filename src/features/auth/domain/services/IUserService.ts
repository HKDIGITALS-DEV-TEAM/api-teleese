/* eslint-disable no-unused-vars */

import { IUser } from '@features/auth/data/schema/interfaces/IUser';
import { UserDTO } from '@features/auth/presentation/dto/UserDTO';

/**
 * Interface définissant les opérations du service utilisateur.
 */
export interface IUserService {
  getUserByKeycloakId(keycloakId: string): Promise<UserDTO>;
  createUser(userData: Partial<IUser>): Promise<UserDTO>;
}
