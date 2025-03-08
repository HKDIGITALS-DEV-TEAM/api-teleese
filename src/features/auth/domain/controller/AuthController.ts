/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserServiceImpl } from '@features/auth/domain/services/UserServiceImpl';
import { RegisterRequest } from '@features/auth/presentation/request/RegisterRequest';
import { ChangePasswordRequest } from '@features/auth/presentation/request/ChangePasswordRequest';
import { ResetPasswordRequest } from '@features/auth/presentation/request/ResetPasswordRequest';
import { VerifyEmailRequest } from '@features/auth/presentation/request/VerifyEmailRequest';
import { LoginRequest } from '@features/auth/presentation/request/LoginRequest';

const userService = new UserServiceImpl();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification et des utilisateurs
 */
export class AuthController {
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Inscription d'un nouvel utilisateur
   *     tags: [Auth]
   *     requestBody:
   *       description: Informations de l'utilisateur
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterRequest'
   *     responses:
   *       201:
   *         description: Utilisateur créé avec succès
   *       400:
   *         description: Erreur de validation
   */
  static async register(req: FastifyRequest<{ Body: RegisterRequest }>, res: FastifyReply) {
    const user = await userService.register(req.body);
    res.status(201).send(user);
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Connexion d'un utilisateur
   *     tags: [Auth]
   *     requestBody:
   *       description: Identifiants de connexion
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginRequest'
   *     responses:
   *       200:
   *         description: Connexion réussie, retourne l'accessToken et le refreshToken
   *       401:
   *         description: Identifiants invalides
   */
  static async login(req: FastifyRequest<{ Body: LoginRequest }>, res: FastifyReply) {
    const tokens = await userService.login(req.body.identifier, req.body.password);
    res.status(200).send(tokens);
  }

  /**
   * @swagger
   * /auth/refresh-token:
   *   post:
   *     summary: Rafraîchir le token d'accès
   *     tags: [Auth]
   *     requestBody:
   *       description: Token de rafraîchissement
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Nouveau token généré
   *       401:
   *         description: Token invalide ou expiré
   */
  static async refreshToken(
    req: FastifyRequest<{ Body: { refreshToken: string } }>,
    res: FastifyReply
  ) {
    const newToken = await userService.refreshToken(req.body.refreshToken);
    res.status(200).send(newToken);
  }

  /**
   * @swagger
   * /auth/verify-email:
   *   post:
   *     summary: Vérifier l'email d'un utilisateur
   *     tags: [Auth]
   *     requestBody:
   *       description: Token de vérification d'email
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/VerifyEmailRequest'
   *     responses:
   *       200:
   *         description: Email vérifié avec succès
   *       400:
   *         description: Token invalide ou expiré
   */
  static async verifyEmail(req: FastifyRequest<{ Body: VerifyEmailRequest }>, res: FastifyReply) {
    await userService.verifyEmail(req.body.token);
    res.status(200).send({ message: 'Email vérifié avec succès' });
  }

  /**
   * @swagger
   * /auth/reset-password:
   *   post:
   *     summary: Demander un reset de mot de passe
   *     tags: [Auth]
   *     requestBody:
   *       description: Email de l'utilisateur pour recevoir le lien de réinitialisation
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ResetPasswordRequest'
   *     responses:
   *       200:
   *         description: Email envoyé avec succès
   *       400:
   *         description: Utilisateur non trouvé
   */
  static async resetPassword(
    req: FastifyRequest<{ Body: ResetPasswordRequest }>,
    res: FastifyReply
  ) {
    await userService.resetPassword(req.body.email);
    res.status(200).send({ message: 'E-mail de réinitialisation envoyé avec succès' });
  }

  /**
   * @swagger
   * /auth/change-password:
   *   post:
   *     summary: Changer le mot de passe
   *     tags: [Auth]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       description: Informations nécessaires pour le changement de mot de passe
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ChangePasswordRequest'
   *     responses:
   *       200:
   *         description: Mot de passe mis à jour
   *       400:
   *         description: Erreur de validation
   */
  static async changePassword(req: FastifyRequest, res: FastifyReply) {
    try {
      const { userId, newPassword } = req.body as ChangePasswordRequest;

      const success = await userService.changePassword(userId, newPassword);

      if (success) {
        return res.status(200).send({ message: 'Mot de passe mis à jour' });
      } else {
        return res.status(400).send({ message: 'Erreur lors de la mise à jour' });
      }
    } catch (error) {
      return res.status(500).send({ message: 'Erreur interne du serveur' });
    }
  }

  /**
   * @swagger
   * /auth/me:
   *   get:
   *     summary: Obtenir les informations de l'utilisateur connecté
   *     tags: [Auth]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Informations utilisateur
   *       401:
   *         description: Non autorisé
   */
  static async getProfile(req: FastifyRequest, res: FastifyReply) {
    try {
      const user = await userService.getProfile((req as any).user.id);
      return res.status(200).send(user);
    } catch (error: any) {
      return res.status(400).send({ message: error.message || 'Erreur interne' });
    }
  }
}
