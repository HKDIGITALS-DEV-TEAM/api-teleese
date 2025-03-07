import { UserDAOImpl } from '@features/auth/data/dao/UserDAOImpl';
import { IUserService } from './IUserService';
import { IUser } from '@features/auth/data/schema/interfaces/IUser';
import { ValidationException } from '@core/exceptions/ValidationException';
import { ResourceNotFoundException } from '@core/exceptions/ResourceNotFoundException';
import { UserDTO } from '@features/auth/presentation/dto/UserDTO';
import { toUserDTO } from '@features/auth/presentation/mapper/UserMapper';

/**
 * Service utilisateur.
 */
export class UserServiceImpl implements IUserService {
  private userDAO: UserDAOImpl;

  constructor() {
    this.userDAO = new UserDAOImpl();
  }

  async getUserByKeycloakId(keycloakId: string): Promise<UserDTO> {
    if (!keycloakId) {
      throw new ValidationException("Le keycloakId de l'utilisateur est requis.");
    }

    const user = await this.userDAO.findByKeycloakId(keycloakId);

    if (!user) {
      throw new ResourceNotFoundException('Utilisateur', keycloakId);
    }

    return new UserDTO(toUserDTO(user));
  }

  async createUser(userData: Partial<IUser>): Promise<UserDTO> {
    const user = await this.userDAO.create(userData);

    return new UserDTO(toUserDTO(user));
  }
}
