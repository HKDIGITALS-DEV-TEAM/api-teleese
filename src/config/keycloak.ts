import Keycloak from 'keycloak-connect';
import { config } from './env';

const keycloakConfig: any = {
  'auth-server-url': config.keycloak.serverUrl,
  realm: config.keycloak.realm,
  resource: config.keycloak.clientId,
  'confidential-port': 0,
  'ssl-required': 'external',
  'bearer-only': true, // ✅ Correction ici
  credentials: {
    secret: config.keycloak.clientSecret,
  },
};

const keycloak = new Keycloak({}, keycloakConfig);

export { keycloak };
