import { IsString, MinLength } from 'class-validator';

/**
 * Requête de connexion d'un utilisateur.
 */
export class LoginRequest {
  /**
   * Identifiant (email ou username).
   */
  @IsString()
  identifier!: string;

  /**
   * Mot de passe de l'utilisateur.
   */
  @IsString()
  @MinLength(6)
  password!: string;
}
