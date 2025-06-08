import { Roles } from '../enums/roles.enum';

export interface User {
  email: string;
  password: string;
  role: Roles;
  fisrtName: string;
  lastName: string;
  picture: string;
}
