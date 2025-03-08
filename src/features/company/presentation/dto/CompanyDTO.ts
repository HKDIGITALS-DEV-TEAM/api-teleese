import { IBaseDTO } from '@core/base/IBaseDTO';

/**
 * DTO pour les entreprises.
 */
export interface ICompanyDTO extends IBaseDTO {
  name: string;
  description?: string;
  category: string;
  ownerId: string;
}
