import mongoose, { Schema, Document } from 'mongoose';
import { ICompany } from './interfaces/ICompany';

/**
 * Schéma Mongoose pour une compagnie.
 */
const CompanySchema: Schema = new Schema(
    {
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        description: { type: String, required: false },
        category: { type: Schema.Types.ObjectId, ref: 'CompanyCategory' },
        users: [
            {
                user: { type: Schema.Types.ObjectId, ref: 'User' },
                role: { type: String, required: true, default: 'admin' },
            },
        ],
        configurations: { type: Object, default: {} },
        aiOptions: { type: Array, default: [] },
    },
    { timestamps: true }
);

const Company = mongoose.model<ICompany & Document>('Company', CompanySchema);

export { Company };
