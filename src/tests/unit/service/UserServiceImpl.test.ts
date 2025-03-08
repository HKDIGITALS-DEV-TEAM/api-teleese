/* eslint-disable no-undef */
import { UserServiceImpl } from '@features/auth/domain/services/UserServiceImpl';
import { UserDAOImpl } from '@features/auth/data/dao/UserDAOImpl';
import { RegisterRequest } from '@features/auth/presentation/request/RegisterRequest';
import { LoginRequest } from '@features/auth/presentation/request/LoginRequest';
import { ValidationException } from '@core/exceptions/ValidationException';
import { ResourceNotFoundException } from '@core/exceptions/ResourceNotFoundException';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '@features/auth/data/schema/interfaces/IUser';
import { MailService } from '@infrastructure/mailer/MailService';

jest.mock('@features/auth/data/dao/UserDAOImpl');

jest.mock('@infrastructure/mailer/MailService');

const mockMailService = new MailService() as jest.Mocked<MailService>;

mockMailService.sendResetPasswordEmail = jest.fn().mockResolvedValue(true);
mockMailService.sendVerificationEmail = jest.fn().mockResolvedValue(true);

const mockUserDAO = new UserDAOImpl() as jest.Mocked<UserDAOImpl>;

const userService = new UserServiceImpl();

(userService as any).userDAO = mockUserDAO;

describe('UserServiceImpl', () => {
  const mockUser = {
    _id: '123',
    id: '123',
    username: 'john_doe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'hashedpassword',
    roles: [{ role_id: '1', name: 'admin' }],
    emailVerified: true,
    companyRoles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as unknown as IUser;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('✅ register - Devrait créer un utilisateur', async () => {
    mockUserDAO.findByUsernameOrEmail.mockResolvedValue(null);
    mockUserDAO.create.mockResolvedValue(mockUser);

    const request: RegisterRequest = {
      username: 'john_doe',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
    };

    const result = await userService.register(request);
    expect(result.email).toBe('john@example.com');
    expect(mockUserDAO.create).toHaveBeenCalled();
  });

  test("❌ register - Devrait renvoyer une erreur si l'email existe déjà", async () => {
    mockUserDAO.findByUsernameOrEmail.mockResolvedValue(mockUser);

    const request: RegisterRequest = {
      username: 'john_doe',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
    };

    await expect(userService.register(request)).rejects.toThrow(ValidationException);
  });

  test('✅ login - Devrait retourner un token pour un utilisateur valide', async () => {
    mockUserDAO.findByUsernameOrEmail.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'valid_token');

    const request: LoginRequest = {
      identifier: 'john@example.com',
      password: 'password123',
    };

    const result = await userService.login(request.identifier, request.password);
    expect(result.accessToken).toBe('valid_token');
  });

  test("❌ login - Devrait renvoyer une erreur si l'utilisateur est introuvable", async () => {
    mockUserDAO.findByUsernameOrEmail.mockResolvedValue(null);

    await expect(userService.login('inconnu@example.com', 'password123')).rejects.toThrow(
      ResourceNotFoundException
    );
  });

  test('✅ getProfile - Devrait récupérer un utilisateur', async () => {
    mockUserDAO.findById.mockResolvedValue(mockUser);
    const result = await userService.getUserById('123');
    expect(result.email).toBe('john@example.com');
  });

  test('✅ changePassword - Devrait changer le mot de passe', async () => {
    mockUserDAO.findById.mockResolvedValue(mockUser);
    mockUserDAO.update.mockResolvedValue({
      ...mockUser,
      password: 'new_hashed_password',
    } as IUser);

    const result = await userService.changePassword(mockUser.id, 'newpassword123');

    expect(result).toBeTruthy();
    expect(mockUserDAO.update).toHaveBeenCalled();
  });

  test('✅ resetPassword - Devrait envoyer un e-mail de réinitialisation', async () => {
    await expect(userService.resetPassword('test@example.com')).resolves.toBeTruthy();
    expect(mockMailService.sendResetPasswordEmail).toHaveBeenCalled();
  });

  test('✅ verifyEmail - Devrait envoyer un e-mail de vérification', async () => {
    await expect(userService.verifyEmail('test@example.com')).resolves.toBeTruthy();
    expect(mockMailService.sendVerificationEmail).toHaveBeenCalled();
  });
});
