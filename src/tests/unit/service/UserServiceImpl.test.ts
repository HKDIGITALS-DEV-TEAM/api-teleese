/* eslint-disable no-undef */
import { UserDAOImpl } from '@features/auth/data/dao/UserDAOImpl';
import { IUser } from '@features/auth/data/schema/interfaces/IUser';
import { UserServiceImpl } from '@features/auth/domain/services/UserServiceImpl';
import { ResourceNotFoundException } from '@core/exceptions/ResourceNotFoundException';
import { ValidationException } from '@core/exceptions/ValidationException';
import { UserDTO } from '@features/auth/presentation/dto/UserDTO';

jest.mock('../../../../src/features/auth/data/dao/UserDAOImpl');

const mockUserDAO = new UserDAOImpl() as jest.Mocked<UserDAOImpl>;
const userService = new UserServiceImpl();
userService['userDAO'] = mockUserDAO;

describe('UserServiceImpl', () => {
  const mockUser: Partial<IUser> = {
    _id: '123',
    keycloakId: 'keycloak-123',
    userName: 'John-Doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Devrait lever une erreur si le keycloakId est vide', async () => {
    await expect(userService.getUserByKeycloakId('')).rejects.toThrow(ValidationException);
  });

  test("Devrait lever une erreur si l'utilisateur n'existe pas", async () => {
    mockUserDAO.findByKeycloakId.mockResolvedValue(null);

    await expect(userService.getUserByKeycloakId('inconnu')).rejects.toThrow(
      ResourceNotFoundException
    );
  });

  test('Devrait récupérer un utilisateur par Keycloak ID', async () => {
    mockUserDAO.findByKeycloakId.mockResolvedValue(mockUser as IUser);

    const result = await userService.getUserByKeycloakId('keycloak-123');

    expect(mockUserDAO.findByKeycloakId).toHaveBeenCalledWith('keycloak-123');
    expect(result).toBeInstanceOf(UserDTO);
    expect(result.email).toBe('john@example.com');
  });

  test('Devrait créer un nouvel utilisateur', async () => {
    mockUserDAO.create.mockResolvedValue(mockUser as IUser);

    const result = await userService.createUser(mockUser);

    expect(mockUserDAO.create).toHaveBeenCalledWith(mockUser);
    expect(result).toBeInstanceOf(UserDTO);
    expect(result.firstName).toBe('John');
  });
});
