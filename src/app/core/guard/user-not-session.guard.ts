import { CanActivateFn } from '@angular/router';
import { User } from '../models/interfaces/auth.interface';

export const userNotSessionGuard: CanActivateFn = (route, state) => {
  const userStorage = localStorage.getItem('currentUser');
  if (userStorage) {
    const user: User = JSON.parse(userStorage);
    location.href = user.role + '/home';
    return false;
  }
  return true;
};
