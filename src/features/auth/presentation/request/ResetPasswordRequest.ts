import { IsEmail } from 'class-validator';

/**
 * Requête pour réinitialiser un mot de passe.
 */
export class ResetPasswordRequest {
  /**
   * Email de l'utilisateur pour recevoir le lien de réinitialisation.
   */
  @IsEmail()
  email!: string;
}
