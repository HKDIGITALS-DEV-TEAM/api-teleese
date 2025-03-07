/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ValidationException } from '@core/exceptions/ValidationException';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserServiceImpl } from '../services/UserServiceImpl';
import { UserDTO } from '@features/auth/presentation/dto/UserDTO';

/**
 * Middleware pour vérifier et créer un utilisateur via Keycloak.
 */
export async function keycloakAuthMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) throw new ValidationException('Token manquant dans les en-têtes.');

  const token = authorizationHeader.split(' ')[1];

  try {
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded) throw new ValidationException('Token invalide.');

    const payload = decoded.payload as JwtPayload;
    const kid = decoded.header?.kid as string | undefined;

    if (!kid) throw new ValidationException('Clé du token {kid} manquante.');

    const { preferred_username, given_name, family_name, email, realm_access } = payload;

    if (!realm_access || !realm_access.roles)
      throw new ValidationException('Rôles utilisateur introuvables dans le token.');

    const roles = realm_access.roles.filter(
      (role: string) =>
        !['offline_access', 'uma_authorization', 'default-roles-teleese'].includes(role)
    );

    if (!roles.length) throw new ValidationException('Aucun rôle utilisateur valide trouvé.');

    // Vérifier si l'utilisateur existe en base
    const userService = new UserServiceImpl();
    let user: UserDTO = await userService.getUserByKeycloakId(kid);

    if (!user)
      // Créer un nouvel utilisateur
      await userService.createUser({
        keycloakId: kid,
        userName: preferred_username,
        email: email,
        firstName: given_name,
        lastName: family_name,
        role: roles[0],
      });
  } catch (error) {
    reply.status(500).send({ message: "Erreur d'authentification" });
  }
}
