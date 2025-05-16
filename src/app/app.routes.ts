import {Routes} from '@angular/router';

const RepresentativePageComponent = () =>
  import('./representative/representative-page.component')
    .then(m => m.RepresentativePageComponent);
const MemberPageComponent = () =>
  import('./member/member-page.component')
    .then(m => m.MemberPageComponent);
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
  {
    path: 'member',
    loadComponent: MemberPageComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./member/pages/home-member/home-member.component').then(m => m.HomeMemberComponent)
      },
      {
        path: 'contributions',
        loadComponent: () =>
          import('./member/pages/contributions-member/contributions-member.component').then(m => m.ContributionsMemberComponent)
      },
      {
        path: 'status',
        loadComponent: () =>
          import('./member/pages/status-member/status-member.component').then(m => m.StatusMemberComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./member/pages/settings-member/settings-member.component').then(m => m.SettingsMemberComponent)
      },
    ]
  },

  { path: '**', redirectTo: '' }
];
