import { CompanyCategory } from '../schema/company-category-schema';
import { ICompanyCategoryDAO } from './ICompanyCategoryDAO';
import { ICompanyCategory } from '@features/company/data/schema/interfaces/ICompanyCategory';

/**
 * Implémentation du DAO pour la gestion des catégories de compagnie.
 */
export class CompanyCategoryDAOImpl implements ICompanyCategoryDAO {
    async create(category: Partial<ICompanyCategory>): Promise<ICompanyCategory> {
        const newCategory = new CompanyCategory(category);
        return await newCategory.save();
    }

    async findById(categoryId: string): Promise<ICompanyCategory | null> {
        return await CompanyCategory.findById(categoryId);
    }

    async findByName(name: string): Promise<ICompanyCategory | null> {
        return await CompanyCategory.findOne({ name });
    }
}
