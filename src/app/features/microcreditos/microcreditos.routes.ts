import { Routes } from '@angular/router';

export const MICROCREDITOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/microcreditos-list/microcreditos-list.component').then(
        (m) => m.MicrocreditosListComponent,
      ),
  },
];
