import { IsString, MinLength } from 'class-validator';

/**
 * Requête pour changer le mot de passe.
 */
export class ChangePasswordRequest {
    /**
     * ID de l'utilisateur.
     */
    @IsString()
    userId!: string;

    /**
     * Nouveau mot de passe.
     */
    @IsString()
    @MinLength(6)
    newPassword!: string;
}
