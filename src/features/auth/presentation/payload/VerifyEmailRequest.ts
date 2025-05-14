import { IsString } from 'class-validator';

/**
 * Requête de vérification d'email.
 */
export class VerifyEmailRequest {
    /**
     * Token de vérification envoyé par email.
     */
    @IsString()
    token!: string;
}
