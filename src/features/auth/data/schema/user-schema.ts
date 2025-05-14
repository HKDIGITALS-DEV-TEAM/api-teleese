import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from './interfaces/IUser';
import { BaseEntitySchema } from '@core/base/base-entity';

/**
 * Schéma Mongoose pour un utilisateur.
 */
const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    companyRoles: [{ type: Schema.Types.ObjectId, ref: 'CompanyRole' }],
});

// Ajouter les propriétés de base {BaseEntity}
UserSchema.add(BaseEntitySchema);

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export { User };
