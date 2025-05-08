/* eslint-disable no-undef */
/*eslint-disable @typescript-eslint/no-explicit-any*/
/*eslint-disable @typescript-eslint/no-require-imports */
import { startServer } from '../../../../src/server';
import request from 'supertest';
import { UserDAOImpl } from '@features/auth/data/dao/UserDAOImpl';
import { IUser } from '@features/auth/data/schema/interfaces/IUser';
import { FastifyInstance } from 'fastify';

jest.mock('@features/auth/data/dao/UserDAOImpl');
const mockUserDAO = new UserDAOImpl() as jest.Mocked<UserDAOImpl>;

let fastify: FastifyInstance;

beforeAll(async () => {
  fastify = (await startServer()) as FastifyInstance;
});

afterAll(async () => {
  if (fastify) {
    await fastify.close();
  }
});

describe("AuthController - Tests d'intégration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    _id: '123',
    id: '123',
    username: 'john_doe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'hashedpassword',
    roles: ['user'],
    emailVerified: true,
    companyRoles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as unknown as IUser;

  test('✅ register - Devrait créer un utilisateur', async () => {
    const response = await request(fastify.server).post('/api/v1/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
    });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe('test@example.com');
  });

  test('✅ login - Devrait retourner un token', async () => {
    mockUserDAO.findByUsernameOrEmail.mockResolvedValue(mockUser);

    const response = await request(fastify.server).post('/api/v1/auth/login').send({
      identifier: 'john@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeTruthy();
  });

  test("❌ login - Devrait refuser l'accès avec un mauvais mot de passe", async () => {
    mockUserDAO.findByUsernameOrEmail.mockResolvedValue(mockUser);
    jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(false);

    const response = await request(fastify.server).post('/api/v1/auth/login').send({
      identifier: 'john@example.com',
      password: 'wrongpassword',
    });

    expect(response.status).toBe(400);
  });

  test('✅ getProfile - Devrait récupérer le profil utilisateur', async () => {
    mockUserDAO.findById.mockResolvedValue(mockUser);

    const response = await request(fastify.server)
      .get('/api/v1/auth/me')
      .set('Authorization', 'Bearer valid_token');

    expect(response.status).toBe(200);
    expect(response.body.email).toBe('john@example.com');
  });

  test('✅ changePassword - Devrait permettre le changement de mot de passe', async () => {
    mockUserDAO.findById.mockResolvedValue(mockUser);
    jest.spyOn(require('bcrypt'), 'hash').mockResolvedValue('new_hashed_password');
    mockUserDAO.update.mockResolvedValue({
      ...mockUser,
      password: 'new_hashed_password',
    } as unknown as IUser);

    const response = await request(fastify.server)
      .post('/api/v1/auth/change-password')
      .set('Authorization', 'Bearer valid_token')
      .send({ userId: '123', newPassword: 'newpassword123' });

    expect(response.status).toBe(200);
  });
});
