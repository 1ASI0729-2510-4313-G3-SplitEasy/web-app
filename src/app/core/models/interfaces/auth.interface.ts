import { Roles } from '../enums/roles.enum';

export interface User {
  id: string;
  email: string;
  password: string;
  role: Roles;
  fisrtName: string;
  lastName: string;
  picture: string;
}
