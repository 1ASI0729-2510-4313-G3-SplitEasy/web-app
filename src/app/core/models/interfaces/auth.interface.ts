import { Roles } from '../enums/roles.enum';

export interface User {
  id: string;
  email: string;
  password: string;
  role: Roles;
  firstName: string;
  lastName: string;
  picture: string;
  salary: number;
}
