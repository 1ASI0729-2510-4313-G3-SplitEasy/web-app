import {Routes} from '@angular/router';

const RepresentativePageComponent = () =>
  import('./representative/representative-page.component')
    .then(m => m.RepresentativePageComponent);
const HomeComponent = () =>
  import('./public/home/home.component')
    .then(m => m.HomeComponent);
const LoginComponent = () =>
  import('./auth/login/login.component')
    .then(m => m.LoginComponent);
const RegisterComponent = () =>
  import('./auth/register/register.component')
    .then(m => m.RegisterComponent);
const ForgotPasswordComponent = () =>
  import('./auth/forgot-password/forgot-password.component')
    .then(m => m.ForgotPasswordComponent);
const ResetPasswordComponent = () =>
  import('./auth/reset-password/reset-password.component')
    .then(m => m.ResetPasswordComponent);


export const routes: Routes = [
  { path: '', loadComponent: HomeComponent },
  { path: 'login', loadComponent: LoginComponent },
  { path: 'register', loadComponent: RegisterComponent },
  { path: 'forgot-password', loadComponent: ForgotPasswordComponent },
  { path: 'reset-password', loadComponent: ResetPasswordComponent },
  {
    path: 'representative',
    loadComponent: RepresentativePageComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./representative/pages/home-representative/home-representative.component').then(m => m.HomeRepresentativeComponent)
      },
      {
        path: 'members',
        loadComponent: () =>
          import('./representative/pages/members-representative/members-representative.component').then(m => m.MembersRepresentativeComponent)
      },
      {
        path: 'bills',
        loadComponent: () =>
          import('./representative/pages/bills-representative/bills-representative.component').then(m => m.BillsRepresentativeComponent)
      },
      {
        path: 'contributions',
        loadComponent: () =>
          import('./representative/pages/contributions-representative/contributions-representative.component').then(m => m.ContributionsRepresentativeComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./representative/pages/settings-representative/settings-representative.component').then(m => m.SettingsRepresentativeComponent)
      },
    ]
  },

  { path: '**', redirectTo: '' }
];
