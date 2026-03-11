import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { AuthService } from '../../auth/services/auth.service';
import { ROUTE_PATHS } from '../../../core/constants/route-paths.constants';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, DrawerModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  private readonly authService = inject(AuthService);

  readonly currentUser = this.authService.currentUser;
  readonly drawerVisible = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', route: ROUTE_PATHS.dashboard.inicio },
    { label: 'Pagos', icon: 'pi pi-credit-card', route: ROUTE_PATHS.dashboard.pagos },
    {
      label: 'Reclamos',
      icon: 'pi pi-exclamation-triangle',
      route: ROUTE_PATHS.dashboard.reclamos,
    },
    { label: 'Solicitudes', icon: 'pi pi-file', route: ROUTE_PATHS.dashboard.solicitudes },
    {
      label: 'Capacitaciones',
      icon: 'pi pi-book',
      route: ROUTE_PATHS.dashboard.capacitaciones,
    },
    {
      label: 'Certificado laboral',
      icon: 'pi pi-id-card',
      route: ROUTE_PATHS.dashboard.certificadoLaboral,
    },
    {
      label: 'Cert. laboral histórico',
      icon: 'pi pi-history',
      route: ROUTE_PATHS.dashboard.certificadoLaboralHistorico,
    },
    {
      label: 'Autorización de arma',
      icon: 'pi pi-shield',
      route: ROUTE_PATHS.dashboard.autorizacionArma,
    },
    {
      label: 'Seguridad social',
      icon: 'pi pi-heart',
      route: ROUTE_PATHS.dashboard.seguridadSocial,
    },
    { label: 'Turnos', icon: 'pi pi-calendar', route: ROUTE_PATHS.dashboard.turnos },
  ];

  toggleDrawer(): void {
    this.drawerVisible.update((v) => !v);
  }

  logout(): void {
    this.authService.logout();
  }
}
