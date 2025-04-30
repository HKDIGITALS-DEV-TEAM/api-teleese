import { ICompanyService } from './ICompanyService';
import { ICompanyDAO } from '@features/company/data/dao/ICompanyDAO';
import { ICompanyCategoryDAO } from '@features/company/data/dao/ICompanyCategoryDAO';
import { ICompany } from '@features/company/data/schema/interfaces/ICompany';
import { ResourceNotFoundException } from '@core/exceptions/ResourceNotFoundException';
import { ValidationException } from '@core/exceptions/ValidationException';
import { CompanyDAOImpl } from '@features/company/data/dao/CompanyDAOImpl';
import { CompanyCategoryDAOImpl } from '@features/company/data/dao/CompanyCategoryDAOImpl';
import { Types } from 'mongoose';
import { IUserDAO } from '@features/auth/data/dao/IUserDAO';
import { UserDAOImpl } from '@features/auth/data/dao/UserDAOImpl';
import { CreateCompanyRequest } from '@features/company/presentation/payload/CreateCompanyRequest';
import { UpdateCompanyRequest } from '@features/company/presentation/payload/UpdateCompanyRequest';

/**
 * Implémentation du service pour la gestion des compagnies.
 */
export class CompanyServiceImpl implements ICompanyService {
  private companyDAO: ICompanyDAO;
  private userDAO: IUserDAO;
  private companyCategoryDAO: ICompanyCategoryDAO;

  constructor() {
    this.companyDAO = new CompanyDAOImpl();
    this.userDAO = new UserDAOImpl();
    this.companyCategoryDAO = new CompanyCategoryDAOImpl();
  }

  async createCompany(request: CreateCompanyRequest, ownerId: string): Promise<ICompany> {
    if (!request.name || !request.category) {
      throw new ValidationException('Le nom et la catégorie de la compagnie sont requis.');
    }

    const existingCompany = await this.companyDAO.findByName(request.name);
    if (existingCompany) {
      throw new ValidationException('Une compagnie avec ce nom existe déjà.');
    }

    const owner = await this.userDAO.findById(ownerId);
    if (!owner) {
      throw new ValidationException("L'utilisateur propriétaire est invalide.");
    }

    let category = await this.companyCategoryDAO.findByName(request.category);
    if (!category) {
      category = await this.companyCategoryDAO.create({ name: request.category });
    }

    const newCompany = await this.companyDAO.create({
      name: request.name,
      description: request.description,
      category: category,
      owner: owner,
      users: [{ user: owner, role: 'admin' }],
      configurations: {},
      aiOptions: [],
    });

    return newCompany;
  }

  async getCompanyById(companyId: string): Promise<ICompany | null> {
    if (!Types.ObjectId.isValid(companyId)) {
      throw new ValidationException("L'ID de la compagnie est invalide.");
    }

    const company = await this.companyDAO.findById(companyId);
    if (!company) {
      throw new ResourceNotFoundException('Compagnie', companyId);
    }
    return company;
  }

  async updateCompany(companyId: string, request: UpdateCompanyRequest): Promise<ICompany | null> {
    if (!Types.ObjectId.isValid(companyId)) {
      throw new ValidationException("L'ID de la compagnie est invalide.");
    }

    const company = await this.companyDAO.findById(companyId);
    if (!company) {
      throw new ResourceNotFoundException('Compagnie', companyId);
    }

    let category = null;
    if (request.category) {
      category = await this.companyCategoryDAO.findByName(request.category);
      if (!category) {
        throw new ValidationException("La catégorie spécifiée n'existe pas.");
      }
    }

    return await this.companyDAO.update(companyId, {
      ...request,
      category: category ?? company.category,
    });
  }

  async deleteCompany(companyId: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(companyId)) {
      throw new ValidationException("L'ID de la compagnie est invalide.");
    }

    const company = await this.companyDAO.findById(companyId);
    if (!company) {
      throw new ResourceNotFoundException('Compagnie', companyId);
    }

    return await this.companyDAO.delete(companyId);
  }

  async updateCompanyConfigurations(
    companyId: string,
    configurations: Record<string, any>
  ): Promise<ICompany | null> {
    if (!Types.ObjectId.isValid(companyId)) {
      throw new ValidationException("L'ID de la compagnie est invalide.");
    }

    const company = await this.companyDAO.findById(companyId);
    if (!company) {
      throw new ResourceNotFoundException('Compagnie', companyId);
    }

    return await this.companyDAO.update(companyId, { configurations });
  }

  async updateCompanyAIOptions(
    companyId: string,
    aiOptions: Record<string, any>[]
  ): Promise<ICompany | null> {
    if (!Types.ObjectId.isValid(companyId)) {
      throw new ValidationException("L'ID de la compagnie est invalide.");
    }

    const company = await this.companyDAO.findById(companyId);
    if (!company) {
      throw new ResourceNotFoundException('Compagnie', companyId);
    }

    return await this.companyDAO.update(companyId, { aiOptions });
  }
}
