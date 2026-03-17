import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProgramacionEmpleado } from '../../models/turno.model';

@Component({
  selector: 'app-programacion-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './programacion-table.component.html',
  styleUrl: './programacion-table.component.scss',
})
export class ProgramacionTableComponent {
  readonly programaciones = input.required<ProgramacionEmpleado[]>();
  readonly diasDelMes = input.required<number[]>();
  readonly diaActual = input.required<number>();
}
