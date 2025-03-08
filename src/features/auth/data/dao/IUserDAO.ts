/* eslint-disable no-unused-vars */
import { IUser } from '../schema/interfaces/IUser';

/**
 * Interface pour le DAO des utilisateurs.
 */
export interface IUserDAO {
  /**
   * Crée un nouvel utilisateur.
   * @param user - Les détails de l'utilisateur à créer.
   * @returns L'utilisateur créé.
   */
  create(user: Partial<IUser>): Promise<IUser>;

  /**
   * Récupère un utilisateur par son ID.
   * @param id - L'ID de l'utilisateur.
   * @returns L'utilisateur trouvé ou `null` s'il n'existe pas.
   */
  findById(id: string): Promise<IUser | null>;

  /**
   * Récupère un utilisateur par son username ou son email.
   * @param identifier - Le `username` ou `email` de l'utilisateur.
   * @returns L'utilisateur trouvé ou `null` s'il n'existe pas.
   */
  findByUsernameOrEmail(identifier: string): Promise<IUser | null>;

  /**
   * Met à jour un utilisateur.
   * @param id - L'ID de l'utilisateur.
   * @param updateData - Les champs à mettre à jour.
   * @returns L'utilisateur mis à jour.
   */
  update(id: string, updateData: Partial<IUser>): Promise<IUser | null>;

  /**
   * Supprime un utilisateur par son ID.
   * @param id - L'ID de l'utilisateur.
   * @returns `true` si la suppression a réussi, sinon `false`.
   */
  delete(id: string): Promise<boolean>;
}
