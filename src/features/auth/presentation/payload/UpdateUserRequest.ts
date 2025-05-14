import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * Requête pour la mise à jour d'un utilisateur.
 */
export class UpdateUserRequest {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail({}, { message: "L'email n'est pas valide." })
    email?: string;

    @IsOptional()
    @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
    password?: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    constructor(data: Partial<UpdateUserRequest>) {
        Object.assign(this, data);
    }
}
