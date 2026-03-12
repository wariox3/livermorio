import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { CreatePago, Pago } from '../models/pago.model';

@Injectable({ providedIn: 'root' })
export class PagosService extends BaseHttpService<Pago, CreatePago> {
  protected readonly endpoint = '/pagos';
}
