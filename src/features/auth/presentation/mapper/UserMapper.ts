import { IUser } from '../../data/schema/interfaces/IUser';
import { IUserDTO } from '../dto/IUserDTO';

/**
 * Convertit une entité utilisateur en DTO.
 * @param user - L'entité utilisateur issue de la base de données.
 * @returns Un objet DTO contenant les données nécessaires.
 */
export function toUserDTO(user: IUser): IUserDTO {
  return {
    id: user._id?.toString() || '',
    keycloakId: user.keycloakId,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

/**
 * Convertit un DTO utilisateur en entité utilisateur (IUser).
 * @param dto - Le DTO utilisateur.
 * @returns Une entité IUser prête à être utilisée avec Mongoose.
 */
export function toUserEntity(dto: IUserDTO): IUser {
  return {
    _id: dto.id,
    keycloakId: dto.keycloakId,
    userName: dto.userName,
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    role: dto.role,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  } as IUser;
}
