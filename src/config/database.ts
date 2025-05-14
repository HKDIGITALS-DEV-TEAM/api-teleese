/* eslint-disable no-undef */

import mongoose from 'mongoose';
import { config } from './env';
import { logger } from './logger';

/**
 * Connexion à MongoDB via Mongoose.
 */
export async function connectToDatabase(): Promise<void> {
    try {
        await mongoose.connect(config.mongodb.uri, {
            dbName: config.mongodb.database,
        } as mongoose.ConnectOptions);

        logger.info(`📦 Connecté à MongoDB : ${config.mongodb.database}`);
    } catch (error) {
        logger.error('❌ Erreur de connexion à MongoDB :', error);
        if (config.server.env === 'production') process.exit(1);
    }
}
