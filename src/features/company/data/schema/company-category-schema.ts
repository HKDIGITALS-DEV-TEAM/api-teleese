import mongoose, { Schema, Document } from 'mongoose';
import { ICompanyCategory } from './interfaces/ICompanyCategory';

/**
 * Schéma Mongoose pour une catégorie de compagnie.
 */
const CompanyCategorySchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: false },
    },
    { timestamps: true }
);

const CompanyCategory = mongoose.model<ICompanyCategory & Document>(
    'CompanyCategory',
    CompanyCategorySchema
);

export { CompanyCategory };
