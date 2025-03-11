import { IsString, MaxLength, IsOptional } from 'class-validator';

/**
 * Requête de mise à jour d'une compagnie.
 */
export class UpdateCompanyRequest {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Le nom de la compagnie ne peut pas dépasser 100 caractères.' })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'La description ne peut pas dépasser 500 caractères.' })
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
