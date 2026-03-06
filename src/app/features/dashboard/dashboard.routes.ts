import { Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./inicio/inicio.component').then(m => m.InicioComponent),
      },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
];
