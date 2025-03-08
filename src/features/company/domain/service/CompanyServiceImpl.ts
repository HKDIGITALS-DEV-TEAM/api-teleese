import { ICompanyService } from './ICompanyService';
import { ICompanyDAO } from '@features/company/data/dao/ICompanyDAO';
import { ValidationException } from '@core/exceptions/ValidationException';
import { ResourceNotFoundException } from '@core/exceptions/ResourceNotFoundException';
import { CompanyRequest } from '@features/company/presentation/request/CompanyRequest';
import { ICompanyDTO } from '@features/company/presentation/dto/CompanyDTO';
import { toCompanyDTO, toCompanyEntity } from '@features/company/presentation/mapper/CompanyMapper';

/**
 * Implémentation du service pour la gestion des entreprises.
 */
export class CompanyServiceImpl implements ICompanyService {
  private companyDAO: ICompanyDAO;

  constructor(companyDAO: ICompanyDAO) {
    this.companyDAO = companyDAO;
  }

  async createCompany(request: CompanyRequest): Promise<ICompanyDTO> {
    if (!request.name || !request.ownerId) {
      throw new ValidationException('Le nom et le propriétaire de la compagnie sont requis.');
    }

    const companyEntity = toCompanyEntity(request);
    const createdCompany = await this.companyDAO.create(companyEntity);

    return toCompanyDTO(createdCompany);
  }

  async getCompanyById(companyId: string): Promise<ICompanyDTO | null> {
    const company = await this.companyDAO.findById(companyId);
    if (!company) {
      throw new ResourceNotFoundException('Company', companyId);
    }

    return toCompanyDTO(company);
  }
}
