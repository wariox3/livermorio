import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  PageHeaderComponent,
  LoadingSpinnerComponent,
  EmptyStateComponent,
  ErrorAlertComponent,
} from '../../../../shared';
import { ReclamosService } from '../../services/reclamos.service';
import { Reclamo } from '../../models/reclamo.model';
import { extractErrorMessage } from '../../../../core/utils/error.utils';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AuthService } from '../../../auth/services/auth.service';
import { ReclamoCreateDialogComponent } from '../../components/reclamo-create-dialog/reclamo-create-dialog.component';

@Component({
  selector: 'app-reclamos-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ErrorAlertComponent,
    TableModule,
    ButtonModule,
    TagModule,
    DatePipe,
    ReclamoCreateDialogComponent,
  ],
  templateUrl: './reclamos-list.component.html',
  styleUrl: './reclamos-list.component.scss',
})
export class ReclamosListComponent implements OnInit {
  private readonly reclamosService = inject(ReclamosService);
  private readonly authService = inject(AuthService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly reclamos = signal<Reclamo[]>([]);
  readonly totalRecords = signal(0);
  readonly pageSize = signal(50);
  readonly first = signal(0);
  readonly dialogVisible = signal(false);

  ngOnInit(): void {
    this.loadReclamos(1);
  }

  loadReclamos(page: number): void {
    const user = this.authService.currentUser();

    if (!user) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.reclamosService
      .getReclamos({ page, size: this.pageSize(), empleado_id: user.empleado_id! })
      .subscribe({
        next: (res) => {
          this.reclamos.set(res.items);
          this.totalRecords.set(res.total);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(extractErrorMessage(err, 'No se pudieron cargar los reclamos.'));
          this.loading.set(false);
        },
      });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize();
    this.first.set(first);
    this.pageSize.set(rows);
    this.loadReclamos(Math.floor(first / rows) + 1);
  }

  onNuevo(): void {
    this.dialogVisible.set(true);
  }

  onReclamoCreated(): void {
    this.loadReclamos(1);
  }

  getEstado(reclamo: Reclamo): {
    label: string;
    severity: 'success' | 'info' | 'warn' | 'secondary' | 'contrast' | 'danger';
  } {
    if (reclamo.estado_anulado) return { label: 'Anulado', severity: 'danger' };
    if (reclamo.estado_cerrado) return { label: 'Cerrado', severity: 'secondary' };
    if (reclamo.estado_atendido) return { label: 'Atendido', severity: 'success' };
    if (reclamo.estado_aprobado) return { label: 'Aprobado', severity: 'info' };
    if (reclamo.estado_autorizado) return { label: 'Autorizado', severity: 'warn' };
    return { label: 'Pendiente', severity: 'contrast' };
  }
}
