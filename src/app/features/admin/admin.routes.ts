import { Routes } from "@angular/router";

export const routes: Routes = [
     { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('../../features/login/containers/login-container/login-container.component').then(m => m.LoginContainerComponent),
        title: 'Admin - Login'
      },
      {
        path: 'home',
        loadComponent: () => import('./containers/admin-home-container/admin-home-container.component').then(m => m.AdminHomeContainerComponent),
        title: 'Admin - Home'
      },
      {
        path: 'alta',
        loadComponent: () => import('./containers/admin-alta-container/admin-alta-container.component').then(m => m.AdminAltaContainerComponent),
        title: 'Admin - Alta'
      }
];
