import { Routes } from '@angular/router';
import { userSessionGuard } from './core/guard/user-session.guard';
import { userNotSessionGuard } from './core/guard/user-not-session.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./public/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    canActivate: [userNotSessionGuard],
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [userNotSessionGuard],
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'forgot-password',
    canActivate: [userNotSessionGuard],
    loadComponent: () =>
      import('./auth/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'reset-password',
    canActivate: [userNotSessionGuard],
    loadComponent: () =>
      import('./auth/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: 'member',
    canActivate: [userSessionGuard],
    loadComponent: () =>
      import('./member/member.component').then((m) => m.MemberComponent),
    loadChildren: () =>
      import('./member/member.routes').then((m) => m.memberRoutes),
  },
  {
    path: 'representative',
    canActivate: [userSessionGuard],
    loadComponent: () =>
      import('./representative/representative.component').then(
        (m) => m.RepresentativeComponent
      ),
  },
  {
    path: '**',
    redirectTo: '', // Redirige cualquier ruta no encontrada a la raíz
  },
];
