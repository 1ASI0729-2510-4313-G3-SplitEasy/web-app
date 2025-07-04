import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard'; // Asegúrate de ajustar el path según tu estructura

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadChildren: () => import('./public/home/home.module').then(m => m.HomeModule) },
  { path: 'autenticacion', loadChildren: () => import('./pages/full-pages/authentication.module').then(m => m.AuthenticationModule) },

  {
    path: 'representante',
    component: LayoutComponent,
    canActivate: [AuthGuard], // 🔒 Protegida por AuthGuard
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/modules/representative/representative.module').then(m => m.RepresentativeModule)
      }
    ]
  },
  {
    path: 'miembro',
    component: LayoutComponent,
    canActivate: [AuthGuard], // 🔒 Protegida por AuthGuard
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/modules/member/member.module').then(m => m.MemberModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
