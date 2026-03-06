import { Routes } from '@angular/router';

export const RECLAMOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/reclamos-list/reclamos-list.component').then(
        m => m.ReclamosListComponent,
      ),
  },
];
