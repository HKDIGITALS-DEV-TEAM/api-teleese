/**
 * Interface définissant la structure du UserDTO.
 */
export interface IUserDTO {
  id: string;
  keycloakId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}
