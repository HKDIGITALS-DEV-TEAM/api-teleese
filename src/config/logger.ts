/* eslint-disable no-undef */

import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { config } from './env';

// Récupérer l'environnement actuel
const env = config.server.env || 'development';

// Définir le chemin du fichier log
const logDir = path.join(__dirname, '../../logs');
const logFile = path.join(logDir, `api-${env}-log.log`);

// S'assurer que le dossier `logs` existe
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export const logger = pino(
  {
    level: config.server.log || 'info',
  },
  pino.destination(logFile)
);

export const loggerConfig = {
  level: config.server.log || 'info',
};
