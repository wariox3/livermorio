import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService, PaginatedResponse } from '../../../core';
import { Contrato, ContratosQueryParams } from '../models/contrato.model';

@Injectable({ providedIn: 'root' })
export class CertificadoLaboralService extends BaseHttpService {
  private readonly CONTRATOS_URL = '/rhu/contrato/lista';

  getContratos(params?: ContratosQueryParams): Observable<PaginatedResponse<Contrato>> {
    return this.get<PaginatedResponse<Contrato>>(this.CONTRATOS_URL, {
      page: params?.page,
      size: params?.size,
      empleado_id: params?.empleado_id,
    });
  }
}
