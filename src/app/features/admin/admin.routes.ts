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
        loadComponent: () => import('./containers/admin-am-container/admin-am-container.component').then(m => m.AdminAmContainerComponent),
        title: 'Admin - Alta'
      },
      {
        path: 'modificar/:id',
        loadComponent: () => import('./containers/admin-am-container/admin-am-container.component').then(m => m.AdminAmContainerComponent),
        title: 'Admin - Modificar'
      }
];
