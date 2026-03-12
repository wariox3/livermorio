import { Component, inject, OnInit, signal } from '@angular/core';

import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  PageHeaderComponent,
  LoadingSpinnerComponent,
  EmptyStateComponent,
  ErrorAlertComponent,
} from '../../../../shared';
import { PagosService } from '../../services/pagos.service';
import { Pago } from '../../models/pago.model';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-pagos-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ErrorAlertComponent,
    TableModule,
    TagModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './pagos-list.component.html',
  styleUrl: './pagos-list.component.scss',
})
export class PagosListComponent implements OnInit {
  private readonly pagosService = inject(PagosService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly pagos = signal<Pago[]>([]);

  ngOnInit(): void {
    this.loadPagos();
  }

  loadPagos(): void {
    this.loading.set(true);
    this.error.set(null);

    this.pagosService.getAll().subscribe({
      next: (response) => {
        this.pagos.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'No se pudieron cargar los pagos.');
        this.loading.set(false);
      },
    });
  }

  estadoSeverity(estado: Pago['estado']): 'success' | 'warn' | 'danger' {
    const map: Record<Pago['estado'], 'success' | 'warn' | 'danger'> = {
      pagado: 'success',
      pendiente: 'warn',
      rechazado: 'danger',
    };
    return map[estado];
  }
}
