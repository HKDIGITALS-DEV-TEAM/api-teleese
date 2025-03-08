import mongoose, { Schema, Model } from 'mongoose';
import { ICompany } from './interfaces/ICompany';
import { BaseEntitySchema } from '@core/base/base-entity';

/**
 * Schéma Mongoose pour stocker les compagnies.
 */
const CompanySchema: Schema<ICompany> = new Schema(
  {
    ownerId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    questions: [
      {
        question: String,
        type: {
          type: String,
          enum: [
            'text',
            'file',
            'email',
            'password',
            'number',
            'audio',
            'single_choice',
            'multiple_choice',
          ],
          required: true,
        },
        options: [String],
      },
    ],
  },
  { timestamps: true }
);

// Ajouter les champs de base (BaseEntity)
CompanySchema.add(BaseEntitySchema);

export const Company: Model<ICompany> = mongoose.model<ICompany>('Company', CompanySchema);
