/* Datos y lógica pura del tablero de candidatos / expediente, portados 1:1 del
   prototipo (objeto CAND, mkVals, DOCS_OK, ORDER, semOf). Sin React aquí: solo
   tipos, datos y funciones puras que consumen las páginas de src/pages/app. */

export type Severidad = 'ambar' | 'indet';
export type ResultadoValidacion = 'ok' | 'ambar' | 'indet' | 'pend' | 'bad';
export type MarcaCriterio = 'o' | 'y' | 'n';
export type Semaforo = 'verde' | 'ambar' | 'rojo' | 'indet';
export type TipoResolucion = 'aclarado' | 'asumido' | 'pendiente';

/** Tipos de `.pill` disponibles en theme.css */
export type PillTipo = 'ok' | 'wa' | 'ba' | 'ne' | 'ai';

export interface EstadoPill {
  tipo: PillTipo;
  texto: string;
  /** si lleva el punto `<i></i>` antes del texto */
  dot: boolean;
}

export interface Hallazgo {
  titulo: string;
  sev: Severidad;
  /** validación de origen · quién lo levantó */
  origen: string;
  evidencia: string;
  /** si ya se resolvió, el texto "<tipo>. <motivo>" (undefined = abierto) */
  resolucion?: string;
}

export interface Validacion {
  titulo: string;
  resultado: ResultadoValidacion;
  detalle: string;
  proveedor: string;
  costo: string;
}

export interface Documento {
  nombre: string;
  detalle: string;
}

export interface Criterio {
  marca: MarcaCriterio;
  texto: string;
  etiqueta: string;
}

export interface EventoBitacora {
  fecha: string;
  evento: string;
  quien: string;
  detalle: string;
}

export interface Candidato {
  nombre: string;
  subtitulo: string;
  /** % de match contra el perfil */
  match: number;
  docs: string;
  estado: EstadoPill;
  /** identidad sin poder evaluarse: no cuenta como semáforo definitivo */
  indet?: boolean;
  validaciones: Validacion[];
  documentos: Documento[];
  criterios: Criterio[];
  hallazgos: Hallazgo[];
  bitacora: EventoBitacora[];
}

/* ─── etiquetas / colores del semáforo (SEMLBL, SEMCOL del prototipo) ───── */
export const SEM_LABEL: Record<Semaforo, string> = {
  verde: 'Verde',
  ambar: 'Ámbar',
  rojo: 'Rojo',
  indet: 'Sin definir',
};
export const SEM_COLOR: Record<Semaforo, string> = {
  verde: 'var(--ok)',
  ambar: 'var(--warn)',
  rojo: 'var(--bad)',
  indet: 'var(--ia)',
};
/** clase de pill + si lleva punto (pillSem del prototipo) */
export const SEM_PILL: Record<Semaforo, { tipo: PillTipo; dot: boolean }> = {
  verde: { tipo: 'ok', dot: true },
  ambar: { tipo: 'wa', dot: true },
  rojo: { tipo: 'ba', dot: true },
  indet: { tipo: 'ai', dot: false },
};

/** RESPILL del prototipo: cómo se pinta cada resultado de validación */
export const RESULTADO_VALIDACION_PILL: Record<
  ResultadoValidacion,
  { tipo: PillTipo; texto: string; dot: boolean }
> = {
  ok: { tipo: 'ok', texto: 'Aprobada', dot: true },
  ambar: { tipo: 'wa', texto: 'Con hallazgo', dot: true },
  indet: { tipo: 'ai', texto: 'Indeterminada', dot: false },
  pend: { tipo: 'ne', texto: 'No ejecutada', dot: false },
  bad: { tipo: 'ba', texto: 'Rechazada', dot: true },
};

/** texto de la etiqueta elegida al resolver un hallazgo (map de doResolver) */
export const RESOLUCION_LABEL: Record<TipoResolucion, string> = {
  aclarado: 'Aclarado',
  asumido: 'Asumido con conocimiento',
  pendiente: 'Con seguimiento posterior',
};

/** semOf del prototipo: nivel de riesgo a partir de los hallazgos ámbar abiertos */
export function semOf(c: Candidato): Semaforo {
  if (c.indet) return 'indet';
  const abiertos = c.hallazgos.filter((f) => !f.resolucion && f.sev === 'ambar').length;
  if (abiertos === 0) return 'verde';
  return abiertos >= 3 ? 'rojo' : 'ambar';
}

export function hallazgosAbiertos(c: Candidato): Hallazgo[] {
  return c.hallazgos.filter((f) => !f.resolucion);
}

export function hallazgosResueltos(c: Candidato): Hallazgo[] {
  return c.hallazgos.filter((f) => f.resolucion);
}

/* ─── documentos (DOCS_OK del prototipo, compartido por los 5 candidatos) ── */
const DOCS_OK: Documento[] = [
  {
    nombre: 'Identificación oficial (INE)',
    detalle: 'Vigente al 2031 · datos coinciden con lo capturado',
  },
  {
    nombre: 'Comprobante de estudios (bachillerato)',
    detalle: 'Concluido · nombre coincide con la INE',
  },
  {
    nombre: 'Antecedentes penales',
    detalle: 'Sin registros · consultado contra más de 38 listas y bases de datos',
  },
  { nombre: 'Comprobante de domicilio', detalle: 'Recibo de luz de julio 2026' },
  { nombre: 'CURP', detalle: 'Coincide con INE' },
];

/* ─── validaciones (mkVals del prototipo) ───────────────────────────────── */
interface ValidacionOverrides {
  doc?: ResultadoValidacion;
  docd?: string;
  id?: ResultadoValidacion;
  idd?: string;
  lis?: ResultadoValidacion;
  lisd?: string;
  ant?: ResultadoValidacion;
  antd?: string;
  ref?: ResultadoValidacion;
  refd?: string;
  dom?: ResultadoValidacion;
  domd?: string;
}

function mkVals(o: ValidacionOverrides = {}): Validacion[] {
  return [
    {
      titulo: 'Revisión documental',
      resultado: o.doc ?? 'ok',
      detalle: o.docd ?? '5 documentos leídos y cruzados entre sí y contra la solicitud',
      proveedor: 'Motor documental',
      costo: '—',
    },
    {
      titulo: 'Identidad y prueba de vida',
      resultado: o.id ?? 'ok',
      detalle: o.idd ?? 'Coincidencia con la INE · confianza 97.4%',
      proveedor: 'Proveedor de biometría',
      costo: '$18.00',
    },
    {
      titulo: 'Listas restrictivas y PEP',
      resultado: o.lis ?? 'ok',
      detalle: o.lisd ?? 'Sin coincidencias en 14 listas consultadas',
      proveedor: 'Proveedor de listas',
      costo: '$9.50',
    },
    {
      titulo: 'Antecedentes penales',
      resultado: o.ant ?? 'ok',
      detalle: o.antd ?? 'Sin registros · consultado contra más de 38 listas y bases de datos',
      proveedor: 'Proveedor de antecedentes',
      costo: '$42.00',
    },
    {
      titulo: 'Referencias laborales',
      resultado: o.ref ?? 'ok',
      detalle: o.refd ?? '2 de 2 confirmadas',
      proveedor: 'Verificación telefónica',
      costo: '$26.00',
    },
    {
      titulo: 'Verificación de domicilio',
      resultado: o.dom ?? 'ok',
      detalle: o.domd ?? 'Domicilio confirmado',
      proveedor: 'Proveedor de domicilio',
      costo: '$14.00',
    },
  ];
}

/* ─── criterios obligatorios (comparten los 3 primeros los 5 candidatos) ── */
const CRIT_OBLIGATORIOS: Criterio[] = [
  {
    marca: 'o',
    texto: 'Bachillerato concluido (escolaridad media superior)',
    etiqueta: 'Obligatorio · cumple',
  },
  {
    marca: 'o',
    texto: 'Experiencia mínima de 6 meses en manejo de efectivo',
    etiqueta: 'Obligatorio · cumple',
  },
  { marca: 'o', texto: 'Actitud de servicio y atención a clientes', etiqueta: 'Obligatorio · cumple' },
];

/* ─── candidatos (objeto CAND del prototipo) ────────────────────────────── */
export const CAND: Record<string, Candidato> = {
  jose: {
    nombre: 'José Luis Márquez Bernal',
    subtitulo: '41 años · Tultitlán, Edo. Méx · 6 km de la sucursal · se postuló el 31 de agosto',
    match: 86,
    docs: '5 de 5',
    estado: { tipo: 'ok', texto: 'Listo para decidir', dot: true },
    validaciones: mkVals(),
    documentos: DOCS_OK,
    criterios: [
      ...CRIT_OBLIGATORIOS,
      { marca: 'y', texto: 'Experiencia previa en manejo de caja bancaria', etiqueta: 'Match' },
      { marca: 'y', texto: 'Domicilio a menos de 20 km', etiqueta: 'Match · 6 km' },
      { marca: 'n', texto: 'Organización y precisión', etiqueta: 'Match · no acreditada' },
    ],
    hallazgos: [],
    bitacora: [
      { fecha: '31 ago 08:12', evento: 'Consentimiento otorgado', quien: 'Candidato', detalle: 'Aviso v2.1' },
      {
        fecha: '31 ago 08:19',
        evento: 'Pre-filtro aprobado',
        quien: 'Sistema',
        detalle: '3 de 3 criterios obligatorios',
      },
      {
        fecha: '31 ago 11:40',
        evento: 'Documentación válida',
        quien: 'Sistema',
        detalle: 'Sin observaciones · primer intento',
      },
      { fecha: '31 ago 11:52', evento: 'Identidad confirmada', quien: 'Sistema', detalle: 'Confianza 98.8%' },
      {
        fecha: '31 ago 12:05',
        evento: 'Sin coincidencias en listas',
        quien: 'Sistema',
        detalle: '14 listas',
      },
      {
        fecha: '31 ago 12:31',
        evento: 'Expediente generado',
        quien: 'Sistema',
        detalle: 'Match 86% · riesgo verde · al tablero',
      },
    ],
  },

  ana: {
    nombre: 'Ana Karen Rosales Ibarra',
    subtitulo: '34 años · Coacalco, Edo. Méx · 31 km de la sucursal · se postuló el 30 de agosto',
    match: 79,
    docs: '5 de 5',
    estado: { tipo: 'wa', texto: 'En revisión', dot: true },
    validaciones: mkVals({
      ref: 'ambar',
      refd: '1 de 2 confirmadas · la segunda no contestó en 3 intentos',
      dom: 'ambar',
      domd: 'No se pudo confirmar el domicilio en la visita',
    }),
    documentos: DOCS_OK,
    criterios: [
      ...CRIT_OBLIGATORIOS,
      { marca: 'y', texto: 'Organización y precisión', etiqueta: 'Match' },
      { marca: 'n', texto: 'Experiencia previa en manejo de caja bancaria', etiqueta: 'Match' },
      { marca: 'n', texto: 'Domicilio a menos de 20 km', etiqueta: 'Match · 31 km' },
    ],
    hallazgos: [
      {
        titulo: 'Referencia laboral que no contesta',
        sev: 'ambar',
        origen: 'Referencias laborales · verificación telefónica',
        evidencia:
          'Se intentó 3 veces en 2 días al número de Almacenes Regiomontanos. La otra referencia sí confirmó 2 años y 4 meses como operadora.',
      },
      {
        titulo: 'Domicilio sin confirmar',
        sev: 'ambar',
        origen: 'Verificación de domicilio · proveedor externo',
        evidencia:
          'El recibo de luz está a nombre de un tercero y en la visita nadie atendió. La candidata declaró vivir con su familia.',
      },
    ],
    bitacora: [
      {
        fecha: '30 ago 19:41',
        evento: 'Consentimiento otorgado',
        quien: 'Candidata',
        detalle: 'Aviso v2.1 · casilla de reuso aceptada',
      },
      {
        fecha: '30 ago 19:48',
        evento: 'Pre-filtro aprobado',
        quien: 'Sistema',
        detalle: '3 de 3 criterios obligatorios · evaluado contra ficha 8f2a',
      },
      {
        fecha: '30 ago 19:49',
        evento: 'Documentos solicitados',
        quien: 'Sistema',
        detalle: '4 documentos · plazo al 6 de septiembre',
      },
      {
        fecha: '30 ago 21:03',
        evento: 'Documento observado',
        quien: 'Sistema',
        detalle: 'Comprobante de estudios · imagen ilegible',
      },
      { fecha: '31 ago 09:04', evento: 'Corrección recibida', quien: 'Candidata', detalle: 'Intento 1 de 3' },
      {
        fecha: '31 ago 09:12',
        evento: 'Documentación válida',
        quien: 'Sistema',
        detalle: '5 documentos cruzados sin inconsistencias',
      },
      {
        fecha: '31 ago 09:20',
        evento: 'Identidad confirmada',
        quien: 'Sistema',
        detalle: 'Confianza 97.4% · solo entonces se consultaron listas',
      },
      {
        fecha: '31 ago 09:26',
        evento: 'Sin coincidencias en listas',
        quien: 'Sistema',
        detalle: '14 listas · $9.50',
      },
      {
        fecha: '31 ago 10:41',
        evento: 'Hallazgo levantado',
        quien: 'Sistema',
        detalle: 'Referencia que no contesta · bandera ámbar',
      },
      {
        fecha: '31 ago 14:08',
        evento: 'Hallazgo levantado',
        quien: 'Sistema',
        detalle: 'Domicilio sin confirmar · bandera ámbar',
      },
      {
        fecha: '31 ago 14:09',
        evento: 'Expediente generado',
        quien: 'Sistema',
        detalle: 'Match 79% · riesgo ámbar · al tablero',
      },
    ],
  },

  ricardo: {
    nombre: 'Ricardo Ontiveros Salas',
    subtitulo: '29 años · Cuautitlán Izcalli, Edo. Méx · 12 km de la sucursal · se postuló el 30 de agosto',
    match: 72,
    docs: '5 de 5',
    estado: { tipo: 'wa', texto: 'En revisión', dot: true },
    validaciones: mkVals({
      ref: 'ambar',
      refd: '2 de 2 confirmadas, una con reserva sobre puntualidad',
      id: 'ok',
      idd: 'Coincidencia con la INE · confianza 91.2% · prueba de vida en el límite',
    }),
    documentos: DOCS_OK,
    criterios: [
      ...CRIT_OBLIGATORIOS,
      { marca: 'y', texto: 'Domicilio a menos de 20 km', etiqueta: 'Match · 12 km' },
      { marca: 'n', texto: 'Experiencia previa en manejo de caja bancaria', etiqueta: 'Match' },
      { marca: 'n', texto: 'Organización y precisión', etiqueta: 'Match' },
    ],
    hallazgos: [
      {
        titulo: 'Prueba de vida en el límite',
        sev: 'ambar',
        origen: 'Identidad y prueba de vida · proveedor de biometría',
        evidencia:
          'Confianza 91.2%, por encima del umbral de rechazo pero debajo del umbral de confianza plena. La identidad sí quedó confirmada.',
      },
      {
        titulo: 'Referencia con reserva',
        sev: 'ambar',
        origen: 'Referencias laborales · verificación telefónica',
        evidencia:
          'Su jefe anterior en Grupo Logístico del Valle confirmó el puesto y las fechas, y mencionó tres retardos en el último trimestre.',
      },
    ],
    bitacora: [
      { fecha: '30 ago 17:22', evento: 'Consentimiento otorgado', quien: 'Candidato', detalle: 'Aviso v2.1' },
      {
        fecha: '30 ago 17:30',
        evento: 'Pre-filtro aprobado',
        quien: 'Sistema',
        detalle: '3 de 3 criterios obligatorios',
      },
      { fecha: '31 ago 08:15', evento: 'Documentación válida', quien: 'Sistema', detalle: '2 correcciones' },
      {
        fecha: '31 ago 08:44',
        evento: 'Identidad confirmada',
        quien: 'Sistema',
        detalle: 'Confianza 91.2% · hallazgo ámbar',
      },
      {
        fecha: '31 ago 09:02',
        evento: 'Sin coincidencias en listas',
        quien: 'Sistema',
        detalle: '14 listas',
      },
      {
        fecha: '31 ago 16:20',
        evento: 'Expediente generado',
        quien: 'Sistema',
        detalle: 'Match 72% · riesgo ámbar · al tablero',
      },
    ],
  },

  miguel: {
    nombre: 'Miguel Ángel Cortés Ruvalcaba',
    subtitulo: '37 años · Tultepec, Edo. Méx · 9 km de la sucursal · se postuló el 1 de septiembre',
    match: 64,
    docs: '5 de 5',
    estado: { tipo: 'ok', texto: 'Listo para decidir', dot: true },
    validaciones: mkVals(),
    documentos: DOCS_OK,
    criterios: [
      ...CRIT_OBLIGATORIOS,
      { marca: 'y', texto: 'Domicilio a menos de 20 km', etiqueta: 'Match · 9 km' },
      { marca: 'n', texto: 'Experiencia previa en manejo de caja bancaria', etiqueta: 'Match' },
      { marca: 'n', texto: 'Organización y precisión', etiqueta: 'Match' },
    ],
    hallazgos: [],
    bitacora: [
      { fecha: '1 sep 07:55', evento: 'Consentimiento otorgado', quien: 'Candidato', detalle: 'Aviso v2.1' },
      {
        fecha: '1 sep 08:02',
        evento: 'Pre-filtro aprobado',
        quien: 'Sistema',
        detalle: '3 de 3 criterios obligatorios',
      },
      { fecha: '1 sep 10:20', evento: 'Documentación válida', quien: 'Sistema', detalle: 'Sin observaciones' },
      { fecha: '1 sep 10:38', evento: 'Identidad confirmada', quien: 'Sistema', detalle: 'Confianza 96.1%' },
      {
        fecha: '1 sep 11:04',
        evento: 'Expediente generado',
        quien: 'Sistema',
        detalle: 'Match 64% · riesgo verde · al tablero',
      },
    ],
  },

  dulce: {
    nombre: 'Dulce Paulina Vega Nájera',
    subtitulo: '26 años · Nextlalpan, Edo. Méx · 17 km de la sucursal · se postuló el 1 de septiembre',
    match: 58,
    docs: '5 de 5',
    estado: { tipo: 'ai', texto: 'En verificación', dot: false },
    indet: true,
    validaciones: mkVals({
      id: 'indet',
      idd: 'No se pudo evaluar · 3 capturas con luz insuficiente. No es un rechazo.',
      lis: 'pend',
      lisd: 'No ejecutada · las listas requieren identidad confirmada',
      ant: 'pend',
      antd: 'No ejecutada',
      ref: 'pend',
      refd: 'No ejecutada',
      dom: 'pend',
      domd: 'No ejecutada',
    }),
    documentos: DOCS_OK,
    criterios: [
      ...CRIT_OBLIGATORIOS,
      { marca: 'y', texto: 'Domicilio a menos de 20 km', etiqueta: 'Match · 17 km' },
      { marca: 'n', texto: 'Experiencia previa en manejo de caja bancaria', etiqueta: 'Match' },
      { marca: 'n', texto: 'Organización y precisión', etiqueta: 'Match' },
    ],
    hallazgos: [
      {
        titulo: 'Identidad sin poder evaluar',
        sev: 'indet',
        origen: 'Identidad y prueba de vida · proveedor de biometría',
        evidencia:
          'Tres capturas con luz insuficiente. El proveedor devolvió «indeterminada», no «rechazada»: no hay evidencia de que sea otra persona. El caso pasó a revisión humana y las listas no se consultaron.',
      },
    ],
    bitacora: [
      { fecha: '1 sep 13:10', evento: 'Consentimiento otorgado', quien: 'Candidata', detalle: 'Aviso v2.1' },
      {
        fecha: '1 sep 13:18',
        evento: 'Pre-filtro aprobado',
        quien: 'Sistema',
        detalle: '3 de 3 criterios obligatorios',
      },
      { fecha: '1 sep 15:02', evento: 'Documentación válida', quien: 'Sistema', detalle: 'Sin observaciones' },
      {
        fecha: '1 sep 15:30',
        evento: 'Identidad indeterminada',
        quien: 'Sistema',
        detalle: '3 intentos · luz insuficiente · NO es un rechazo',
      },
      {
        fecha: '1 sep 15:30',
        evento: 'Enviado a revisión humana',
        quien: 'Sistema',
        detalle: 'Listas no consultadas · nada que pagar todavía',
      },
      {
        fecha: '1 sep 15:31',
        evento: 'Expediente parcial al tablero',
        quien: 'Sistema',
        detalle: 'Match 58% · sin nivel de riesgo definitivo',
      },
    ],
  },
};

/** ORDER del prototipo: orden fijo en el que se muestran en el tablero */
export const ORDER: string[] = ['jose', 'ana', 'ricardo', 'miguel', 'dulce'];
