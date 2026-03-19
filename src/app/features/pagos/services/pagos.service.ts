import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService, PaginatedResponse } from '../../../core';
import { Pago, PagosQueryParams } from '../models/pago.model';

@Injectable({ providedIn: 'root' })
export class PagosService extends BaseHttpService {
  private readonly PAGOS_URL = '/rhu/pago/lista';

  getPagos(params?: PagosQueryParams): Observable<PaginatedResponse<Pago>> {
    return this.get<PaginatedResponse<Pago>>(this.PAGOS_URL, {
      page: params?.page,
      size: params?.size,
      empleado_id: params?.empleado_id,
    });
  }
}
