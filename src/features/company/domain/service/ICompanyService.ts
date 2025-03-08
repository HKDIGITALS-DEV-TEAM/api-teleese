/* eslint-disable no-unused-vars */
import { ICompanyDTO } from '@features/company/presentation/dto/CompanyDTO';
import { CompanyRequest } from '@features/company/presentation/request/CompanyRequest';

/**
 * Interface pour la gestion des entreprises.
 */
export interface ICompanyService {
  /**
   * Crée une nouvelle entreprise.
   * @param request - Données de l'entreprise à créer.
   * @returns L'entreprise créée sous forme de DTO.
   */
  createCompany(request: CompanyRequest): Promise<ICompanyDTO>;

  /**
   * Récupère une entreprise par son ID.
   * @param companyId - L'ID de l'entreprise.
   * @returns L'entreprise sous forme de DTO.
   */
  getCompanyById(companyId: string): Promise<ICompanyDTO | null>;
}
