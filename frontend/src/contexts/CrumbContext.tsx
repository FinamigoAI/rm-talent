import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const CrumbContext = createContext<{ crumb: string; setCrumb: (v: string) => void } | null>(null);

export function CrumbProvider({ children }: { children: ReactNode }) {
  const [crumb, setCrumb] = useState('Solicitudes');
  return <CrumbContext.Provider value={{ crumb, setCrumb }}>{children}</CrumbContext.Provider>;
}

export function useCrumbValue() {
  const ctx = useContext(CrumbContext);
  if (!ctx) throw new Error('useCrumbValue debe usarse dentro de CrumbProvider');
  return ctx.crumb;
}

export function useSetCrumb(label: string) {
  const ctx = useContext(CrumbContext);
  if (!ctx) throw new Error('useSetCrumb debe usarse dentro de CrumbProvider');
  useEffect(() => {
    ctx.setCrumb(label);
  }, [label]);
}
