export interface Pago {
  id: number;
  concepto: string;
  monto: number;
  fecha: string;
  estado: 'pendiente' | 'pagado' | 'rechazado';
}

export interface CreatePago {
  concepto: string;
  monto: number;
}
