import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService, PaginatedResponse } from '../../../core';
import {
  CreateProgramacionReporteRequest,
  ProgramacionEmpleado,
  ProgramacionReporte,
  ProgramacionReporteTipo,
} from '../models/turno.model';

@Injectable({ providedIn: 'root' })
export class TurnosService extends BaseHttpService {
  private readonly TURNOS_URL = '/tur/programacion/empleado';
  private readonly REPORTE_TIPOS_URL = '/tur/programacion_reporte_tipo/lista';
  private readonly REPORTE_CREATE_URL = '/tur/programacion_reporte/nuevo';

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

  /** Obtiene la lista de tipos de reporte de programación. */
  getReporteTipos(): Observable<PaginatedResponse<ProgramacionReporteTipo>> {
    return this.get<PaginatedResponse<ProgramacionReporteTipo>>(this.REPORTE_TIPOS_URL, {
      size: 200,
    });
  }

  /** Crea un nuevo reporte de programación. */
  createReporte(body: CreateProgramacionReporteRequest): Observable<ProgramacionReporte> {
    return this.post<ProgramacionReporte>(this.REPORTE_CREATE_URL, body);
  }
}
