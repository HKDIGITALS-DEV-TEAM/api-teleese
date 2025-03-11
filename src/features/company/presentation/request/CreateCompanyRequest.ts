import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Requête de création d'une compagnie.
 */
export class CreateCompanyRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, { message: 'Le nom de la compagnie ne peut pas dépasser 100 caractères.' })
  name!: string;

  @IsString()
  @MaxLength(500, { message: 'La description ne peut pas dépasser 500 caractères.' })
  description?: string;

  @IsNotEmpty()
  @IsString()
  category!: string;
}
