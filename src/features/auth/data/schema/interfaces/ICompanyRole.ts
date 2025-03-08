import { IBaseEntity } from '@core/base/base-entity';
import { Types } from 'mongoose';

/**
 * Interface représentant le rôle d'un utilisateur dans une compagnie.
 */
export interface ICompanyRole extends IBaseEntity {
  user: Types.ObjectId; // Référence à l'ID de l'utilisateur
  company: Types.ObjectId; // Référence à l'ID de la compagnie
  role: string; // Rôle de l'utilisateur dans la compagnie (ex: "admin", "manager", etc.)
}
