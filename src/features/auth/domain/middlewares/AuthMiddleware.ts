/*eslint-disable @typescript-eslint/no-explicit-any*/
import { FastifyRequest, FastifyReply } from 'fastify';
import jwt, { Secret } from 'jsonwebtoken';
import { config } from '@config/env';
import { UserServiceImpl } from '@features/auth/domain/services/UserServiceImpl';

const userService = new UserServiceImpl();

/**
 * Middleware de protection des routes par JWT.
 * Vérifie la validité du token et rafraîchit le token si nécessaire.
 */
export async function AuthMiddleware(req: FastifyRequest, res: FastifyReply) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Token manquant ou invalide' });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Vérification du token d'accès
      const decoded = jwt.verify(token, config.jwt.secret as Secret) as {
        id: string;
        email: string;
        roles: string[];
      };

      // Récupération de l'utilisateur en base de données
      const user = await userService.getUserById(decoded.id);
      if (!user) {
        return res.status(401).send({ message: 'Utilisateur non trouvé' });
      }

      // Ajout de l'utilisateur à la requête
      (req as any).user = {
        id: decoded.id,
        email: decoded.email,
        roles: decoded.roles,
      };

      return;
    } catch (error: unknown) {
      const err = error as Error;

      // Vérification si c'est une erreur d'expiration
      if (err.name === 'TokenExpiredError') {
        try {
          const refreshToken = req.headers['x-refresh-token'] as string;
          if (!refreshToken) {
            return res.status(401).send({ message: 'Token expiré, connexion requise' });
          }

          // Rafraîchir le token d'accès
          const newAccessToken = await userService.refreshToken(refreshToken);

          // Retourner le nouveau token en entête
          res.header('x-access-token', newAccessToken.accessToken);
          res.header('x-access-token-expiration', newAccessToken.expiresIn.toString());

          return;
        } catch (refreshError: unknown) {
          const refreshErr = refreshError as Error;
          return res
            .status(401)
            .send({ message: `Refresh token invalide ou expiré: ${refreshErr.message}` });
        }
      } else {
        return res.status(401).send({ message: `Token invalide: ${err.message}` });
      }
    }
  } catch (error: unknown) {
    const err = error as Error;
    return res.status(500).send({ message: `Erreur interne du serveur: ${err.message}` });
  }
}
