import { IUserDTO } from './IUserDTO';

/**
 * Classe DTO pour les utilisateurs.
 */
export class UserDTO implements IUserDTO {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
    roles: string[];
    companyRoles: any[];
    createdAt: Date;
    updatedAt: Date;

    constructor(user: IUserDTO) {
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.emailVerified = user.emailVerified;
        this.roles = user.roles;
        this.companyRoles = user.companyRoles;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}
