import { CanActivateFn } from '@angular/router';

export const userSessionGuard: CanActivateFn = (route, state) => {
  const userStorage = localStorage.getItem('currentUser');
  if (userStorage) return true;
  return false;
};
