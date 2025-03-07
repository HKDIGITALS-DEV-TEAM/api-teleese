import { IUserDTO } from './IUserDTO';

/**
 * Classe DTO pour les utilisateurs.
 */
export class UserDTO implements IUserDTO {
  id: string;
  keycloakId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: IUserDTO) {
    this.id = user.id;
    this.keycloakId = user.keycloakId;
    this.userName = user.userName;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
