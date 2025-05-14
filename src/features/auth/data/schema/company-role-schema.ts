import mongoose, { Model, Schema } from 'mongoose';
import { ICompanyRole } from './interfaces/ICompanyRole';
import { BaseEntitySchema } from '@core/base/base-entity';

/**
 * Schéma Mongoose pour la relation entre un utilisateur et une compagnie.
 */
const CompanyRoleSchema: Schema<ICompanyRole> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    role: { type: String, required: true }, // Ex: "admin", "manager", "employee"
});

// Ajouter les propriétés de base {BaseEntity}
CompanyRoleSchema.add(BaseEntitySchema);

const CompanyRole: Model<ICompanyRole> = mongoose.model<ICompanyRole>(
    'CompanyRole',
    CompanyRoleSchema
);

export { CompanyRole };
