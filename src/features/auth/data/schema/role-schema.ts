import mongoose, { Model, Schema } from 'mongoose';
import { IRole } from './interfaces/IRole';
import { BaseEntitySchema } from '@core/base/base-entity';

/**
 * Schéma Mongoose pour les rôles utilisateur.
 */
const RoleSchema: Schema<IRole> = new Schema({
    name: { type: String, required: true, unique: true },
});

// Ajouter les propriétés de base {BaseEntity}
RoleSchema.add(BaseEntitySchema);

const Role: Model<IRole> = mongoose.model<IRole>('Role', RoleSchema);

export { Role };
