import { Routes } from '@angular/router';

export const memberRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home-member/home-member.component').then(
        (m) => m.HomeMemberComponent
      ),
  },
];
