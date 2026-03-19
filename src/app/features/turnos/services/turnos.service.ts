import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';
import { ProgramacionEmpleado } from '../models/turno.model';

@Injectable({ providedIn: 'root' })
export class TurnosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  /** Consulta la programación mensual de turnos para un empleado en un año y mes específicos. */
  getProgramacionEmpleado(
    empleadoId: number,
    anio: number,
    mes: number,
  ): Observable<ProgramacionEmpleado[]> {
    const params = new HttpParams()
      .set('empleado_id', empleadoId)
      .set('anio', anio)
      .set('mes', mes);

    return this.http.get<ProgramacionEmpleado[]>(
      `${this.baseUrl}${API_ENDPOINTS.turnos.programacionEmpleado}`,
      { params },
    );
  }
}
