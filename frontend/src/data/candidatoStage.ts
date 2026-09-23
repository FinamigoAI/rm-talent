// Contenido y tablas de estado del recorrido móvil del candidato (`/candidato`).
// Portado 1:1 desde el prototipo HTML (sección "demo móvil del candidato").

export type EstadoPaso = 'wait' | 'doing' | 'ok';

/** Mapea el número de panel del teléfono (p-N) al índice del punto activo en #pdots. */
export const PSTEP: Record<number, number> = { 1: 0, 2: 1, 3: 2, 6: 3, 9: 4, 12: 5, 7: 6, 10: 7, 13: 8, 14: 9 };

/** A partir de qué índice de dot se marca cada ítem del checklist "El expediente que se arma solo". */
export const EXPLIVE_AT = [3, 6, 6, 7];

export const EXPLIVE_LABELS = [
  'RFC validado ante el SAT',
  'Identidad y ubicación confirmadas',
  'Sin coincidencias en listas restrictivas',
  'Documentos y antecedentes penales validados',
];

export interface PasoId {
  t: string;
  s: string;
  ok: string;
  em?: string;
}

/** Pasos de la verificación en vivo de identidad, prueba de vida, geocerca y listas (panel p-12). */
export const PASOS_ID: PasoId[] = [
  { t: 'Comparando tu rostro con la foto de tu INE', s: 'Proveedor de biometría', ok: 'Coincide · confianza 97.4%' },
  { t: 'Prueba de vida', s: 'Que no sea una foto de una foto', ok: 'Persona real, capturada en vivo' },
  {
    t: 'Confirmando tu ubicación',
    s: 'Geocerca de la Sucursal Centro',
    ok: 'Dentro del radio permitido · 1.2 km de la sucursal',
  },
  {
    t: 'Consultando listas restrictivas',
    s: '14 listas oficiales y PEP',
    ok: 'Sin coincidencias',
    em: 'Solo corre después de confirmar tu identidad',
  },
];

export interface DocValidacion {
  n: string;
  d: string;
  msg: string;
}

/** Documentos que se validan "en vivo" tras pulsar "Subir y validar mis documentos" (panel p-7). */
export const DOCS_VALID: DocValidacion[] = [
  { n: 'Identificación oficial (INE)', d: 'Frente y reverso', msg: 'Vigente al 2031 · nombre y CURP coinciden con lo que capturaste' },
  { n: 'Comprobante de estudios', d: 'Bachillerato concluido', msg: 'Vigente · los datos empatan con tu INE' },
  { n: 'Antecedentes penales', d: 'Consulta de seguridad', msg: 'Sin registros · consultado contra más de 38 listas y bases de datos' },
  { n: 'Comprobante de domicilio', d: 'Recibo de luz', msg: 'Julio 2026 · legible y a tu nombre' },
];

/** Requisitos de la vacante mostrados en el panel p-1. */
export const REQUISITOS = [
  'Escolaridad media superior (bachillerato concluido)',
  'Experiencia mínima de 6 meses en manejo de efectivo o atención a clientes',
  'Disponibilidad de horario de sucursal, incluyendo sábados',
  'Deseable: experiencia previa en manejo de caja bancaria',
];

export const LO_QUE_DEBES_SABER = [
  'Examen médico de aptitud al momento de la contratación',
  'La sucursal abre sábados en horario reducido',
];
