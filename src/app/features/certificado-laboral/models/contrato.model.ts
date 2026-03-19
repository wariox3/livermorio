export interface Contrato {
  codigo_contrato_pk: number;
  codigo_empleado_fk: number;
  fecha_desde: string;
  fecha_hasta: string;
  vr_salario: number;
}

export interface ContratosQueryParams {
  page?: number;
  size?: number;
  empleado_id: number;
}
