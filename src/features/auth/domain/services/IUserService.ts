/* eslint-disable no-unused-vars */
import { IUser } from '@features/auth/data/schema/interfaces/IUser';
import { UserDTO } from '@features/auth/presentation/dto/UserDTO';

/**
 * Interface du service utilisateur.
 */
export interface IUserService {
    /**
     * Inscrit un nouvel utilisateur.
     * @param userData - Données du nouvel utilisateur.
     * @returns Un DTO utilisateur avec les informations essentielles.
     */
    register(userData: Partial<IUser>): Promise<UserDTO>;

    /**
     * Authentifie un utilisateur avec username/email et password.
     * @param identifier - Le `username` ou `email` de l'utilisateur.
     * @param password - Le mot de passe de l'utilisateur.
     * @returns Un objet contenant l'accessToken, le refreshToken et l'utilisateur.
     */
    login(
        identifier: string,
        password: string
    ): Promise<{ accessToken: string; refreshToken: string; user: UserDTO }>;

    /**
     * Récupère un utilisateur par son ID.
     * @param userId - L'ID de l'utilisateur.
     * @returns Le DTO utilisateur.
     */
    getUserById(userId: string): Promise<UserDTO>;

    /**
     * Rafraîchit un accessToken en utilisant un refreshToken.
     * @param refreshToken - Le refresh token valide.
     * @returns Un nouvel accessToken.
     */
    refreshToken(refreshToken: string): Promise<{ accessToken: string; expiresIn: string }>;

    /**
     * Met à jour les informations d'un utilisateur.
     * @param userId - L'ID de l'utilisateur.
     * @param updateData - Les données de mise à jour.
     * @returns L'utilisateur mis à jour sous forme de DTO.
     */
    updateUser(userId: string, updateData: Partial<IUser>): Promise<UserDTO>;

    /**
     * Supprime un utilisateur.
     * @param userId - L'ID de l'utilisateur.
     * @returns `true` si l'utilisateur a été supprimé.
     */
    deleteUser(userId: string): Promise<boolean>;

    /**
     * Génère et envoie un e-mail de réinitialisation de mot de passe.
     * @param email - L'email de l'utilisateur.
     */
    resetPassword(email: string): Promise<void>;

    /**
     * Vérifie et active un compte utilisateur via un e-mail de confirmation.
     * @param token - Le token de vérification.
     * @returns `true` si l'e-mail est validé, sinon `false`.
     */
    verifyEmail(token: string): Promise<boolean>;

    /**
     * Change le mot de passe d'un utilisateur.
     * @param userId - L'ID de l'utilisateur.
     * @param newPassword - Le nouveau mot de passe.
     */
    changePassword(userId: string, newPassword: string): Promise<boolean>;

    getProfile(userId: string): Promise<UserDTO>;
}
