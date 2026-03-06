import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { DrawerModule } from 'primeng/drawer';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    MenubarModule,
    DrawerModule,
    PanelMenuModule,
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

  readonly menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: '/dashboard/inicio',
    },
    {
      label: 'Pagos',
      icon: 'pi pi-credit-card',
      routerLink: '/dashboard/pagos',
    },
    {
      label: 'Reclamos',
      icon: 'pi pi-exclamation-triangle',
      routerLink: '/dashboard/reclamos',
    },
    {
      label: 'Solicitudes',
      icon: 'pi pi-file',
      routerLink: '/dashboard/solicitudes',
    },
    {
      label: 'Capacitaciones',
      icon: 'pi pi-book',
      routerLink: '/dashboard/capacitaciones',
    },
    {
      label: 'Certificado Laboral',
      icon: 'pi pi-id-card',
      routerLink: '/dashboard/certificado-laboral',
    },
    {
      label: 'Cert. Laboral Histórico',
      icon: 'pi pi-history',
      routerLink: '/dashboard/certificado-laboral-historico',
    },
    {
      label: 'Autorización de Arma',
      icon: 'pi pi-shield',
      routerLink: '/dashboard/autorizacion-arma',
    },
    {
      label: 'Seguridad Social',
      icon: 'pi pi-heart',
      routerLink: '/dashboard/seguridad-social',
    },
    {
      label: 'Turnos',
      icon: 'pi pi-calendar',
      routerLink: '/dashboard/turnos',
    },
  ];

  toggleDrawer(): void {
    this.drawerVisible.update(v => !v);
  }

  logout(): void {
    this.authService.logout();
  }
}
