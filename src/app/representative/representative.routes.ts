import { Routes } from '@angular/router';

export const representativeRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./repre-home/repre-home.component').then(
        (m) => m.RepreHomeComponent
      ),
  },
  {
    path: 'members',
    loadComponent: () =>
      import('./repre-member/repre-member.component').then(
        (m) => m.RepreMemberComponent
      ),
  },
  {
    path: 'contributions',
    loadComponent: () =>
      import('./repre-contributions/repre-contributions.component').then(
        (m) => m.RepreContributionsComponent
      ),
  },
  {
    path: 'bills',
    loadComponent: () =>
      import('./repre-billing/repre-billing.component').then(
        (m) => m.RepreBillingComponent
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./repre-settings/repre-settings.component').then(
        (m) => m.RepreSettingsComponent
      ),
  },
];
