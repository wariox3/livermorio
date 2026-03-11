import { Routes } from '@angular/router';

export const PAGOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pagos-list/pagos-list.component').then((m) => m.PagosListComponent),
  },
];
