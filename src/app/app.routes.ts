import { HomeRepresentativeComponent } from './representative/component/home-representative/home-representative.component';
import {Routes} from '@angular/router';
import {HomeComponent} from './public/home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {RepresentativePageComponent} from './representative/representative-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  {
    path: 'representative',
    component: RepresentativePageComponent,
    children: [
      { path: 'home', component: HomeRepresentativeComponent },
      // puedes añadir más como: { path: 'members', component: ... }
    ]
  },

  { path: '**', redirectTo: '' }
];
