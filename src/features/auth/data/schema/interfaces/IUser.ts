import { IBaseEntity } from '@core/base/base-entity';

/**
 * Interface représentant un utilisateur.
 */
export interface IUser extends IBaseEntity {
  keycloakId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}
