import { IBaseEntity } from '@core/base/base-entity';
import { IRole } from './IRole';
import { ICompanyRole } from './ICompanyRole';

/**
 * Interface représentant un utilisateur.
 */
export interface IUser extends IBaseEntity {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roles: IRole[];
  companyRoles: ICompanyRole[];
  emailVerified: boolean;
}
