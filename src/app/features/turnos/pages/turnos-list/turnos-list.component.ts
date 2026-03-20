import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { TurnosService } from '../../services/turnos.service';
import { ProgramacionEmpleado, TurnoDelDia } from '../../models/turno.model';
import { obtenerTurnosHoyManana } from '../../helpers/turno.helper';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { TurnoCardComponent } from '../../components/turno-card/turno-card.component';
import { ProgramacionTableComponent } from '../../components/programacion-table/programacion-table.component';
import { ProgramacionCalendarComponent } from '../../components/programacion-calendar/programacion-calendar.component';
import { ReportesTableComponent } from '../../components/reportes-table/reportes-table.component';

@Component({
  selector: 'app-turnos-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    TurnoCardComponent,
    ProgramacionTableComponent,
    ProgramacionCalendarComponent,
    ReportesTableComponent,
  ],
  templateUrl: './turnos-list.component.html',
  styleUrl: './turnos-list.component.scss',
})
export class TurnosListComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly turnosService = inject(TurnosService);

  readonly turnoHoy = signal<TurnoDelDia | null>(null);
  readonly turnoManana = signal<TurnoDelDia | null>(null);
  readonly programaciones = signal<ProgramacionEmpleado[]>([]);
  readonly loading = signal(true);

  readonly diaActual = new Date().getDate();
  readonly diasDelMes = computed(() => {
    const hoy = new Date();
    const totalDias = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    return Array.from({ length: totalDias }, (_, i) => i + 1);
  });

  readonly empleadoId = computed(() => this.authService.currentUser()?.empleado_id ?? 0);

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (!user) {
      this.loading.set(false);
      return;
    }

    obtenerTurnosHoyManana(this.turnosService, user.empleado_id!).subscribe({
      next: ({ turnoHoy, turnoManana, programaciones }) => {
        this.turnoHoy.set(turnoHoy);
        this.turnoManana.set(turnoManana);
        this.programaciones.set(programaciones);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
