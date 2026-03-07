import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../auth/services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    DrawerModule,
    ButtonModule,
    AvatarModule,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  private readonly authService = inject(AuthService);

  readonly currentUser = this.authService.currentUser;
  readonly drawerVisible = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', route: '/dashboard/inicio' },
    { label: 'Pagos', icon: 'pi pi-credit-card', route: '/dashboard/pagos' },
    { label: 'Reclamos', icon: 'pi pi-exclamation-triangle', route: '/dashboard/reclamos' },
    { label: 'Solicitudes', icon: 'pi pi-file', route: '/dashboard/solicitudes' },
    { label: 'Capacitaciones', icon: 'pi pi-book', route: '/dashboard/capacitaciones' },
    { label: 'Certificado Laboral', icon: 'pi pi-id-card', route: '/dashboard/certificado-laboral' },
    { label: 'Cert. Laboral Histórico', icon: 'pi pi-history', route: '/dashboard/certificado-laboral-historico' },
    { label: 'Autorización de Arma', icon: 'pi pi-shield', route: '/dashboard/autorizacion-arma' },
    { label: 'Seguridad Social', icon: 'pi pi-heart', route: '/dashboard/seguridad-social' },
    { label: 'Turnos', icon: 'pi pi-calendar', route: '/dashboard/turnos' },
  ];

  toggleDrawer(): void {
    this.drawerVisible.update(v => !v);
  }

  logout(): void {
    this.authService.logout();
  }
}
