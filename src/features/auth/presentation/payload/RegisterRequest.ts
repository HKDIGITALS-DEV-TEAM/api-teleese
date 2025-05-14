import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Requête pour l'inscription d'un utilisateur.
 */
export class RegisterRequest {
    @IsNotEmpty({ message: 'Le username est requis.' })
    @IsString()
    username!: string;

    @IsNotEmpty({ message: "L'email est requis." })
    @IsEmail({}, { message: "L'email n'est pas valide." })
    email!: string;

    @IsNotEmpty({ message: 'Le mot de passe est requis.' })
    @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
    password!: string;

    @IsNotEmpty({ message: 'Le prénom est requis.' })
    @IsString()
    firstName!: string;

    @IsNotEmpty({ message: 'Le nom est requis.' })
    @IsString()
    lastName!: string;

    constructor(data: Partial<RegisterRequest>) {
        Object.assign(this, data);
    }
}
