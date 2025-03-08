import { IUser } from '@features/auth/data/schema/interfaces/IUser';
import { IUserDTO } from '../dto/IUserDTO';

/**
 * Convertit une entité utilisateur (IUser) en DTO (IUserDTO).
 * @param user - L'entité utilisateur issue de la base de données.
 * @returns Un objet DTO contenant les données nécessaires.
 */
export function toUserDTO(user: IUser): IUserDTO {
  return {
    id: user.id.toString(),
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    emailVerified: user.emailVerified,
    roles: user.roles.map((role) => role.name),
    companyRoles: user.companyRoles,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

/**
 * Convertit un DTO utilisateur (IUserDTO) en entité utilisateur (IUser).
 * @param dto - Le DTO de l'utilisateur.
 * @returns Une entité IUser prête à être utilisée avec Mongoose.
 */
export function toUserEntity(dto: IUserDTO): IUser {
  return {
    _id: dto.id,
    username: dto.username,
    email: dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName,
    emailVerified: dto.emailVerified,
    roles: dto.roles as any,
    companyRoles: dto.companyRoles,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  } as IUser;
}
