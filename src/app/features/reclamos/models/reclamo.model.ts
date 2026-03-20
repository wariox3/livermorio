export interface Reclamo {
  codigo_reclamo_pk: number;
  codigo_empleado_fk: number;
  codigo_reclamo_concepto_fk: string;
  concepto_nombre: string;
  fecha: string;
  fecha_cierre: string;
  descripcion: string;
  estado_autorizado: boolean;
  estado_aprobado: boolean;
  estado_anulado: boolean;
  estado_cerrado: boolean;
  estado_atendido: boolean;
  cantidad_respuestas: number;
}

export interface ReclamosQueryParams {
  page?: number;
  size?: number;
  empleado_id: number;
}
