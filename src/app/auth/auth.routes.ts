import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: SigninPageComponent,
      },
      {
        path: 'sign-up',
        component: SignupPageComponent,
      },
      {
        path: '**',
        redirectTo: 'sign-up',
      },
    ],
  },
];

export default authRoutes;