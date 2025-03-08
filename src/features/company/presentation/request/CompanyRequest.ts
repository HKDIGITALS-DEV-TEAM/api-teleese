import { IsNotEmpty, Length } from 'class-validator';

/**
 * Classe de validation pour la création d'une entreprise.
 */
export class CompanyRequest {
  @IsNotEmpty({ message: "Le nom de l'entreprise est obligatoire." })
  @Length(2, 100, { message: 'Le nom doit avoir entre 2 et 100 caractères.' })
  name!: string;

  @Length(0, 500, { message: 'La description doit avoir au maximum 500 caractères.' })
  description?: string;

  @IsNotEmpty({ message: "La catégorie de l'entreprise est obligatoire." })
  category!: string;

  @IsNotEmpty({ message: "L'ID du propriétaire est obligatoire." })
  ownerId!: string;
}
