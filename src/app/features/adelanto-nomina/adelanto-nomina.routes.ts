import { Routes } from '@angular/router';

export const ADELANTO_NOMINA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/adelanto-nomina-list/adelanto-nomina-list.component').then(
        (m) => m.AdelantoNominaListComponent,
      ),
  },
];
