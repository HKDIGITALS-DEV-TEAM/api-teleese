/**
 * Interface représentant une session utilisateur.
 */
export interface IUserSession {
  keycloakId: string;
  username: string;
  email: string;
  roles: string[];
}
