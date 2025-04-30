/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUserService } from './IUserService';
import { IUser } from '@features/auth/data/schema/interfaces/IUser';
import { UserDAOImpl } from '@features/auth/data/dao/UserDAOImpl';
import { UserDTO } from '@features/auth/presentation/dto/UserDTO';
import { toUserDTO } from '@features/auth/presentation/mapper/UserMapper';
import { ValidationException } from '@core/exceptions/ValidationException';
import { ResourceNotFoundException } from '@core/exceptions/ResourceNotFoundException';
import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { config } from '@config/env';
import { UpdateUserRequest } from '@features/auth/presentation/payload/UpdateUserRequest';
import { RegisterRequest } from '@features/auth/presentation/payload/RegisterRequest';
import ms from 'ms';
import { MailService } from '@infrastructure/mailer/MailService';
import { RoleDAOImpl } from '@features/auth/data/dao/RoleDAOImpl';
import { IRoleDAO } from '@features/auth/data/dao/IRoleDAO';
import { IUserDAO } from '@features/auth/data/dao/IUserDAO';

/**
 * Implémentation du service utilisateur.
 */
export class UserServiceImpl implements IUserService {
  private userDAO: IUserDAO;
  private roleDAO: IRoleDAO;
  private mailService: MailService;

  constructor() {
    this.userDAO = new UserDAOImpl();
    this.roleDAO = new RoleDAOImpl();
    this.mailService = new MailService();
  }

  async register(request: RegisterRequest): Promise<UserDTO> {
    const existingUser = await this.userDAO.findByUsernameOrEmail(request.email);
    if (existingUser) {
      throw new ValidationException('Un utilisateur avec cet email existe déjà.');
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(request.password, 10);

    // Vérifier si le rôle "user" existe, sinon le créer
    let userRole = await this.roleDAO.findByName('user');
    if (!userRole) {
      userRole = await this.roleDAO.create({ name: 'user' });
    }

    const newUser = await this.userDAO.create({
      username: request.username,
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      password: hashedPassword,
      emailVerified: false,
      roles: [userRole],
    });

    // Générer un token de vérification d'email
    const verificationToken = this.generateVerificationToken(newUser);

    // Envoyer l'email de vérification
    await this.mailService.sendVerificationEmail(newUser.email, verificationToken);

    return new UserDTO(toUserDTO(newUser));
  }

  async login(
    identifier: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDTO }> {
    if (!identifier || !password) {
      throw new ValidationException('Le username/email et le password sont requis.');
    }

    const user = await this.userDAO.findByUsernameOrEmail(identifier);
    if (!user) {
      throw new ResourceNotFoundException('Utilisateur', identifier);
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ValidationException('Mot de passe incorrect.');
    }

    // Générer les tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
      user: new UserDTO(toUserDTO(user)),
    };
  }

  async getUserById(userId: string): Promise<UserDTO> {
    if (!userId) {
      throw new ValidationException("L'ID de l'utilisateur est requis.");
    }

    const user = await this.userDAO.findById(userId);
    if (!user) {
      throw new ResourceNotFoundException('Utilisateur', userId);
    }

    return new UserDTO(toUserDTO(user));
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; expiresIn: string }> {
    if (!refreshToken) {
      throw new ValidationException('Le refreshToken est requis.');
    }

    try {
      const payload = jwt.verify(refreshToken, config.jwt.secret) as { id: string };

      const user = await this.userDAO.findById(payload.id);
      if (!user) {
        throw new ResourceNotFoundException('Utilisateur', payload.id);
      }

      const newAccessToken = this.generateAccessToken(user);

      return {
        accessToken: newAccessToken,
        expiresIn: config.jwt.accessTokenExpiration,
      };
    } catch (error) {
      throw new ValidationException('Refresh token invalide ou expiré.');
    }
  }

  async updateUser(userId: string, request: UpdateUserRequest): Promise<UserDTO> {
    if (!userId) {
      throw new ValidationException("L'ID de l'utilisateur est requis.");
    }

    const updatedUser = await this.userDAO.update(userId, {
      username: request.username,
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      password: request.password ? await bcrypt.hash(request.password, 10) : undefined,
    });

    if (!updatedUser) {
      throw new ResourceNotFoundException('Utilisateur', userId);
    }

    return new UserDTO(toUserDTO(updatedUser));
  }

  async deleteUser(userId: string): Promise<boolean> {
    if (!userId) {
      throw new ValidationException("L'ID de l'utilisateur est requis.");
    }

    return await this.userDAO.delete(userId);
  }

  /**
   * Génère un access token JWT.
   * @param user - L'utilisateur.
   * @returns Le token signé.
   */
  private generateAccessToken(user: IUser): string {
    const payload = {
      id: user.id.toString(),
      email: user.email,
      roles: user.roles.map((role) => role.name),
    };

    const secret: Secret = config.jwt.secret;
    const options: SignOptions = {
      expiresIn: Number(config.jwt.accessTokenExpiration),
    };

    return jwt.sign(payload, secret, options);
  }

  /**
   * Génère un refresh token JWT.
   * @param user - L'utilisateur.
   * @returns Le token signé.
   */
  private generateRefreshToken(user: IUser): string {
    const payload = { id: user.id.toString() };

    const secret: Secret = config.jwt.secret;
    const options: SignOptions = {
      expiresIn: Number(config.jwt.accessTokenExpiration),
    };

    return jwt.sign(payload, secret, options);
  }

  async resetPassword(email: string): Promise<void> {
    const user = await this.userDAO.findByUsernameOrEmail(email);
    if (!user) {
      throw new ResourceNotFoundException('Utilisateur', email);
    }

    const resetToken = jwt.sign({ id: user._id }, config.jwt.secret, {
      expiresIn: Number(ms('1h')), // Expire en 1 heure
    });

    await this.mailService.sendResetPasswordEmail(user.email, resetToken);
  }

  async verifyEmail(token: string): Promise<boolean> {
    try {
      const payload = jwt.verify(token, config.jwt.secret) as { id: string };
      const user = await this.userDAO.findById(payload.id);
      if (!user) {
        throw new ResourceNotFoundException('Utilisateur', payload.id);
      }

      await this.userDAO.update(user.id, { emailVerified: true });
      return true;
    } catch (error) {
      throw new ValidationException('Token invalide ou expiré.');
    }
  }

  async changePassword(userId: string, newPassword: string): Promise<boolean> {
    if (!userId || !newPassword) {
      throw new ValidationException("L'ID utilisateur et le nouveau mot de passe sont requis.");
    }

    const user = await this.userDAO.findById(userId);
    if (!user) {
      throw new ResourceNotFoundException('Utilisateur', userId);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await this.userDAO.update(userId, { password: hashedNewPassword });

    return true;
  }

  /**
   * Génère un token JWT de vérification d'email.
   * @param user - L'utilisateur.
   * @returns Le token signé.
   */
  private generateVerificationToken(user: IUser): string {
    return jwt.sign({ id: user.id.toString() }, config.jwt.secret, {
      expiresIn: Number(ms('24h')),
    });
  }

  async getProfile(userId: string): Promise<UserDTO> {
    const user = await this.userDAO.findById(userId);
    if (!user) {
      throw new ResourceNotFoundException('Utilisateur', userId);
    }
    return new UserDTO(toUserDTO(user));
  }
}
