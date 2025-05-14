import { IUserDAO } from './IUserDAO';
import { IUser } from '../schema/interfaces/IUser';
import { User } from '../schema/user-schema';
import { ValidationException } from '@core/exceptions/ValidationException';
import { ResourceNotFoundException } from '@core/exceptions/ResourceNotFoundException';

/**
 * Implémentation du DAO pour la gestion des utilisateurs.
 */
export class UserDAOImpl implements IUserDAO {
    async create(user: Partial<IUser>): Promise<IUser> {
        if (!user.username || !user.email || !user.password) {
            throw new ValidationException(
                'Les champs username, email et password sont obligatoires.'
            );
        }

        const newUser = new User({
            username: user.username,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles || [],
            companies: user.companyRoles || [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return await newUser.save();
    }

    async findById(id: string): Promise<IUser | null> {
        if (!id) {
            throw new ValidationException("L'ID de l'utilisateur est requis.");
        }

        return await User.findById(id);
    }

    async findByUsernameOrEmail(identifier: string): Promise<IUser | null> {
        if (!identifier) {
            throw new ValidationException("Le username ou l'email est requis.");
        }

        return await User.findOne({
            $or: [{ username: identifier }, { email: identifier }],
        });
    }

    async update(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        if (!id || !updateData) {
            throw new ValidationException(
                "L'ID de l'utilisateur et les données de mise à jour sont requis."
            );
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            throw new ResourceNotFoundException('Utilisateur', id);
        }

        return updatedUser;
    }

    async delete(id: string): Promise<boolean> {
        if (!id) {
            throw new ValidationException("L'ID de l'utilisateur est requis.");
        }

        const result = await User.findByIdAndDelete(id);

        if (!result) {
            throw new ResourceNotFoundException('Utilisateur', id);
        }

        return true;
    }
}
