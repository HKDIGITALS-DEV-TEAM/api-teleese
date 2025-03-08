import { IBaseEntity } from '@core/base/base-entity';
import { ICompanyQuestion } from './ICompanyQuestion';

/**
 * Interface représentant une compagnie.
 */
export interface ICompany extends IBaseEntity {
  ownerId: string;
  name: string;
  description: string;
  category: string;
  questions?: ICompanyQuestion[];
}
