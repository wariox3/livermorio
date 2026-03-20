import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService, PaginatedResponse } from '../../../core';
import { Reclamo, ReclamosQueryParams } from '../models/reclamo.model';

@Injectable({ providedIn: 'root' })
export class ReclamosService extends BaseHttpService {
  private readonly RECLAMOS_URL = '/rhu/reclamo/lista';

  getReclamos(params?: ReclamosQueryParams): Observable<PaginatedResponse<Reclamo>> {
    return this.get<PaginatedResponse<Reclamo>>(this.RECLAMOS_URL, {
      page: params?.page,
      size: params?.size,
      empleado_id: params?.empleado_id,
    });
  }
}
