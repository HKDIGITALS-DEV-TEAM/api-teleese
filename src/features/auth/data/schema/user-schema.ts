import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from './interfaces/IUser';
import { BaseEntitySchema } from '@core/base/base-entity';

/**
 * Schéma Mongoose pour un utilisateur.
 */
const UserSchema: Schema<IUser> = new Schema({
  keycloakId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: false },
});

// Ajouter les propriétés de base {BaseEntity}
UserSchema.add(BaseEntitySchema);

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export { User };
