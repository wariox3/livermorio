import { Routes } from '@angular/router';

export const TURNOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/turnos-list/turnos-list.component').then((m) => m.TurnosListComponent),
  },
];
