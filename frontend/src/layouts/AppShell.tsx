import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { CrumbProvider, useCrumbValue } from '../contexts/CrumbContext';
import { apiClient } from '../api/client';

function navClass({ isActive }: { isActive: boolean }) {
  return isActive ? 'nav on' : 'nav';
}

function Crumb() {
  const crumb = useCrumbValue();
  return (
    <div className="crumb">
      <span>Talent</span> / <b>{crumb}</b>
    </div>
  );
}

export function AppShell() {
  const navigate = useNavigate();

  async function salir() {
    await apiClient.post('/auth/logout', {});
    navigate('/login', { replace: true });
  }

  return (
    <CrumbProvider>
      <div className="app">
        <aside className="rail">
          <button className="modsw" title="Talent">
            <span className="sq">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="m17 11 2 2 4-4" />
              </svg>
            </span>
            <span>
              <b>Talent</b>
              <span>Risk Management</span>
            </span>
          </button>

          <div className="navgrp">
            <span className="lbl">Reclutador</span>
            <NavLink to="/app/bandeja" className={navClass}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                <path d="M5.5 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.5Z" />
              </svg>
              Solicitudes <span className="cnt">3</span>
            </NavLink>
            <NavLink to="/app/vacantes" className={navClass}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              Vacantes <span className="cnt">4</span>
            </NavLink>
            <NavLink to="/app/tablero" className={navClass}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="M7 15v3M12 10v8M17 6v12" />
              </svg>
              Tablero de candidatos
            </NavLink>
            <NavLink to="/app/descartados" className={navClass}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Base de talento
            </NavLink>
          </div>

          <div className="navgrp">
            <span className="lbl">Otras vistas</span>
            <NavLink to="/app/lider" className={navClass}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h20" />
                <path d="M5 20V9l7-5 7 5v11" />
                <path d="M10 20v-5h4v5" />
              </svg>
              Líder de área
            </NavLink>
            <NavLink to="/candidato" className="nav">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="2" width="12" height="20" rx="2.5" />
                <path d="M11 18h2" />
              </svg>
              Postulación del candidato
            </NavLink>
          </div>

          <div className="bottom">
            <button className="nav" onClick={salir}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="m16 17 5-5-5-5M21 12H9" />
              </svg>
              Salir
            </button>
          </div>
        </aside>

        <div className="main">
          <div className="top">
            <Crumb />
            <div className="acts">
              <span className="avatar">PS</span>
            </div>
          </div>
          <div className="body">
            <Outlet />
          </div>
        </div>
      </div>
    </CrumbProvider>
  );
}
