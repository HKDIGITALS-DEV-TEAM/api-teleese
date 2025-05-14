import { Company } from '../schema/company-schema';
import { ICompanyDAO } from './ICompanyDAO';
import { ICompany } from '@features/company/data/schema/interfaces/ICompany';

/**
 * Implémentation du DAO pour la gestion des compagnies.
 */
export class CompanyDAOImpl implements ICompanyDAO {
    async create(company: Partial<ICompany>): Promise<ICompany> {
        const newCompany = new Company(company);
        return await newCompany.save();
    }

    async findById(companyId: string): Promise<ICompany | null> {
        return await Company.findById(companyId);
    }

    async findByName(name: string): Promise<ICompany | null> {
        return await Company.findOne({ name });
    }

    async update(companyId: string, updateData: Partial<ICompany>): Promise<ICompany | null> {
        return await Company.findByIdAndUpdate(companyId, updateData, { new: true });
    }

    async delete(companyId: string): Promise<boolean> {
        const result = await Company.findByIdAndDelete(companyId);
        return result !== null;
    }
}
