/* eslint-disable no-unused-vars */
import { ICompany } from '../schema/interfaces/ICompany';

/**
 * Interface DAO pour la gestion des compagnies.
 */
export interface ICompanyDAO {
  create(companyData: Partial<ICompany>): Promise<ICompany>;
  findById(companyId: string): Promise<ICompany | null>;
}
