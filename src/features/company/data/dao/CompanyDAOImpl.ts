import { ICompanyDAO } from './ICompanyDAO';
import { Company } from '../schema/company-schema';
import { ICompany } from '../schema/interfaces/ICompany';

/**
 * Implémentation du DAO pour la gestion des compagnies.
 */
export class CompanyDAOImpl implements ICompanyDAO {
  async create(companyData: Partial<ICompany>): Promise<ICompany> {
    return await Company.create(companyData);
  }

  async findById(companyId: string): Promise<ICompany | null> {
    return await Company.findById(companyId);
  }
}
