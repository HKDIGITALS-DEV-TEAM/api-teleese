import { ICompany } from '@features/company/data/schema/interfaces/ICompany';
import { ICompanyDTO } from '../dto/CompanyDTO';
import { CompanyRequest } from '../request/CompanyRequest';

/**
 * Convertit une entité entreprise en DTO.
 * @param {ICompany} company - L'entité entreprise issue de la base de données.
 * @returns {ICompanyDTO} Un objet DTO contenant les données nécessaires.
 */
export function toCompanyDTO(company: ICompany): ICompanyDTO {
  return {
    id: company._id?.toString() ?? '',
    name: company.name,
    description: company.description,
    category: company.category,
    ownerId: company.ownerId,
    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
  };
}

/**
 * Convertit un DTO entreprise en entité entreprise.
 * @param request - Le DTO de l'entreprise.
 * @returns Une entité ICompany prête à être utilisée avec Mongoose.
 */
export function toCompanyEntity(request: CompanyRequest): ICompany {
  return {
    name: request.name,
    description: request.description,
    category: request.category,
    ownerId: request.ownerId,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as ICompany;
}
