import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../core';
import { ProgramacionEmpleado } from '../models/turno.model';

@Injectable({ providedIn: 'root' })
export class TurnosService extends BaseHttpService {
  private readonly TURNOS_URL = '/tur/programacion/empleado';

  /** Consulta la programación mensual de turnos para un empleado en un año y mes específicos. */
  getProgramacionEmpleado(
    empleadoId: number,
    anio: number,
    mes: number,
  ): Observable<ProgramacionEmpleado[]> {
    return this.get<ProgramacionEmpleado[]>(this.TURNOS_URL, {
      empleado_id: empleadoId,
      anio,
      mes,
    });
  }
}
