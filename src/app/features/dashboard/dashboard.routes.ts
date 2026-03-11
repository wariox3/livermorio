import { Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./inicio/inicio.component').then((m) => m.InicioComponent),
      },
      {
        path: 'pagos',
        loadChildren: () => import('../pagos/pagos.routes').then((m) => m.PAGOS_ROUTES),
      },
      {
        path: 'reclamos',
        loadChildren: () => import('../reclamos/reclamos.routes').then((m) => m.RECLAMOS_ROUTES),
      },
      {
        path: 'solicitudes',
        loadChildren: () =>
          import('../solicitudes/solicitudes.routes').then((m) => m.SOLICITUDES_ROUTES),
      },
      {
        path: 'capacitaciones',
        loadChildren: () =>
          import('../capacitaciones/capacitaciones.routes').then((m) => m.CAPACITACIONES_ROUTES),
      },
      {
        path: 'certificado-laboral',
        loadChildren: () =>
          import('../certificado-laboral/certificado-laboral.routes').then(
            (m) => m.CERTIFICADO_LABORAL_ROUTES,
          ),
      },
      {
        path: 'certificado-laboral-historico',
        loadChildren: () =>
          import('../certificado-laboral-historico/certificado-laboral-historico.routes').then(
            (m) => m.CERTIFICADO_LABORAL_HISTORICO_ROUTES,
          ),
      },
      {
        path: 'autorizacion-arma',
        loadChildren: () =>
          import('../autorizacion-arma/autorizacion-arma.routes').then(
            (m) => m.AUTORIZACION_ARMA_ROUTES,
          ),
      },
      {
        path: 'seguridad-social',
        loadChildren: () =>
          import('../seguridad-social/seguridad-social.routes').then(
            (m) => m.SEGURIDAD_SOCIAL_ROUTES,
          ),
      },
      {
        path: 'turnos',
        loadChildren: () => import('../turnos/turnos.routes').then((m) => m.TURNOS_ROUTES),
      },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
];
