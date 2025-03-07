/* eslint-disable no-undef */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

/**
 * Démarre un serveur MongoDB en mémoire avant les tests.
 */
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, {
      dbName: 'test',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });
  }
});

/**
 * Nettoie les données après chaque test.
 */
afterEach(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db?.dropDatabase();
  }
});

/**
 * Arrête MongoDB après les tests.
 */
afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});
