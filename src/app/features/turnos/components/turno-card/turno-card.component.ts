import { Component, input } from '@angular/core';
import { TurnoDelDia } from '../../models/turno.model';

@Component({
  selector: 'app-turno-card',
  standalone: true,
  templateUrl: './turno-card.component.html',
  styleUrl: './turno-card.component.scss',
})
export class TurnoCardComponent {
  readonly turno = input<TurnoDelDia | null>(null);
  readonly titulo = input.required<string>();
  readonly subtitulo = input.required<string>();
  readonly icono = input.required<string>();
  readonly activo = input(false);
  readonly emptyIcon = input.required<string>();
  readonly emptyTitle = input.required<string>();
  readonly emptyMessage = input.required<string>();
}
