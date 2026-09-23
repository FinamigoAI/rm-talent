import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { CandidatesProvider } from './contexts/CandidatesContext';
import { Login } from './pages/Login';
import { RequireAuth } from './layouts/RequireAuth';
import { AppShell } from './layouts/AppShell';
import { CandidateStage } from './pages/CandidateStage';
import { Bandeja } from './pages/app/Bandeja';
import { DetalleSolicitud } from './pages/app/DetalleSolicitud';
import { ConfiguradorVacante } from './pages/app/ConfiguradorVacante';
import { Publicada } from './pages/app/Publicada';
import { Vacantes } from './pages/app/Vacantes';
import { Tablero } from './pages/app/Tablero';
import { Expediente } from './pages/app/Expediente';
import { GuiaEntrevista } from './pages/app/GuiaEntrevista';
import { SeleccionCierre } from './pages/app/SeleccionCierre';
import { BaseTalento } from './pages/app/BaseTalento';
import { Lider } from './pages/app/Lider';
import { LiderDetalle } from './pages/app/LiderDetalle';

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/candidato" element={<CandidateStage />} />

          <Route element={<RequireAuth />}>
            <Route path="/app" element={<AppShell />}>
              <Route index element={<Navigate to="bandeja" replace />} />
              <Route path="bandeja" element={<Bandeja />} />
              <Route path="solicitud" element={<DetalleSolicitud />} />
              <Route path="cfg" element={<ConfiguradorVacante />} />
              <Route path="pub" element={<Publicada />} />
              <Route path="vacantes" element={<Vacantes />} />
              <Route element={<CandidatesProvider><Outlet /></CandidatesProvider>}>
                <Route path="tablero" element={<Tablero />} />
                <Route path="exp/:id" element={<Expediente />} />
                <Route path="entrevista/:id" element={<GuiaEntrevista />} />
              </Route>
              <Route path="cierre" element={<SeleccionCierre />} />
              <Route path="descartados" element={<BaseTalento />} />
              <Route path="lider" element={<Lider />} />
              <Route path="liderdet" element={<LiderDetalle />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/app" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
