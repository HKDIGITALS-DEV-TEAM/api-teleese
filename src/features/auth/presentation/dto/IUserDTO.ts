/*eslint-disable @typescript-eslint/no-explicit-any*/
/**
 * Interface définissant la structure du UserDTO.
 */
export interface IUserDTO {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  roles: string[];
  companyRoles: any[];
  createdAt: Date;
  updatedAt: Date;
}
