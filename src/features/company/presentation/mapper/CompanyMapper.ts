import { ICompany } from '@features/company/data/schema/interfaces/ICompany';
import { CompanyDTO } from '../dto/CompanyDTO';

/**
 * Convertit une entité `ICompany` en `CompanyDTO`.
 * @param company - L'entité `ICompany` issue de la base de données.
 * @returns Un objet `CompanyDTO` formaté.
 */
export function toCompanyDTO(company: ICompany): CompanyDTO {
    return new CompanyDTO({
        id: company.id.toString(),
        name: company.name,
        description: company.description,
        category: company.category.name,
        owner: company.owner.id.toString(),
        users: company.users.map((u) => ({
            user: u.user.id.toString(),
            role: u.role,
        })),
        configurations: company.configurations ?? {},
        aiOptions: company.aiOptions ?? [],
    });
}
