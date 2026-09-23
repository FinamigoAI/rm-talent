import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CAND, RESOLUCION_LABEL, type Candidato, type TipoResolucion } from '../data/candidatos';

/* Reemplaza la mutación directa del objeto CAND del prototipo (window global +
   re-render manual) por estado de React compartido: sobrevive a la navegación
   Tablero ↔ Expediente ↔ Guía de entrevista, y se pierde al recargar la
   página — exactamente igual que el prototipo, que también reinicia con F5. */

interface CandidatesContextValue {
  candidatos: Record<string, Candidato>;
  /** Marca el hallazgo `index` del candidato `id` como resuelto y agrega el evento a su bitácora. */
  resolverHallazgo: (id: string, index: number, tipo: TipoResolucion, motivo: string) => void;
}

const CandidatesContext = createContext<CandidatesContextValue | null>(null);

export function CandidatesProvider({ children }: { children: ReactNode }) {
  const [candidatos, setCandidatos] = useState<Record<string, Candidato>>(CAND);

  const resolverHallazgo = useCallback(
    (id: string, index: number, tipo: TipoResolucion, motivo: string) => {
      setCandidatos((prev) => {
        const c = prev[id];
        if (!c || !c.hallazgos[index]) return prev;
        const etiqueta = RESOLUCION_LABEL[tipo];
        const hallazgos = c.hallazgos.map((h, i) =>
          i === index ? { ...h, resolucion: `${etiqueta}. ${motivo}` } : h,
        );
        const hora = 'hoy ' + new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
        const bitacora = [
          ...c.bitacora,
          {
            fecha: hora,
            evento: 'Hallazgo resuelto',
            quien: 'Patricia Salazar',
            detalle: `${c.hallazgos[index].titulo} · ${etiqueta} · «${motivo}»`,
          },
        ];
        return { ...prev, [id]: { ...c, hallazgos, bitacora } };
      });
    },
    [],
  );

  return (
    <CandidatesContext.Provider value={{ candidatos, resolverHallazgo }}>
      {children}
    </CandidatesContext.Provider>
  );
}

export function useCandidates() {
  const ctx = useContext(CandidatesContext);
  if (!ctx) throw new Error('useCandidates debe usarse dentro de CandidatesProvider');
  return ctx;
}
