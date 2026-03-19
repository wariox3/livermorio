import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS, buildHttpParams, PaginatedResponse } from '../../../core';
import { Pago, PagosQueryParams } from '../models/pago.model';

@Injectable({ providedIn: 'root' })
export class PagosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getPagos(params?: PagosQueryParams): Observable<PaginatedResponse<Pago>> {
    const httpParams = buildHttpParams({
      page: params?.page,
      size: params?.size,
      empleado_id: params?.empleado_id,
    });

    return this.http.get<PaginatedResponse<Pago>>(`${this.baseUrl}${API_ENDPOINTS.pagos.lista}`, {
      params: httpParams,
    });
  }
}
