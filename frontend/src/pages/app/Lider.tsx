import { useNavigate } from 'react-router-dom';
import { useSetCrumb } from '../../contexts/CrumbContext';
import { useToast } from '../../contexts/ToastContext';

export function Lider() {
  useSetCrumb('Líder de área');
  const navigate = useNavigate();
  const toast = useToast();

  const irADemo = () => toast('En esta demo solo está armada VAC-1184');

  return (
    <div>
      <div className="note warn" style={{ marginBottom: 18 }}>
        <b>Estás viendo Talent como lo ve Mónica Herrera, líder de Operaciones.</b> El mismo
        sistema, otro perfil: sigue el avance de sus vacantes y no ve un solo documento ni
        hallazgo de validación.
      </div>
      <div className="phead">
        <h1>Mis vacantes</h1>
        <p>Operaciones · Sucursal Centro</p>
      </div>
      <div className="tblwrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Folio</th>
              <th>Puesto</th>
              <th>Plazas</th>
              <th>Etapa</th>
              <th>Fecha requerida</th>
              <th>Tiempo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="clickable" onClick={() => navigate('/app/liderdet')}>
              <td className="mono">VAC-1184</td>
              <td className="nm">Cajero de Banco</td>
              <td className="mono">1 / 3</td>
              <td>
                <span className="pill ok">
                  <i></i>En decisión
                </span>
              </td>
              <td className="mono">15 sep 2026</td>
              <td>
                <span className="pill ok">
                  <i></i>11 días de holgura
                </span>
              </td>
              <td className="dim">→</td>
            </tr>
            <tr className="clickable" onClick={irADemo}>
              <td className="mono">SOL-2090</td>
              <td className="nm">Auxiliar de almacén</td>
              <td className="mono">0 / 6</td>
              <td>
                <span className="pill ne">Con el reclutador</span>
              </td>
              <td className="mono">22 sep 2026</td>
              <td>
                <span className="pill ok">
                  <i></i>18 días de holgura
                </span>
              </td>
              <td className="dim">→</td>
            </tr>
            <tr className="clickable" onClick={irADemo}>
              <td className="mono">VAC-1176</td>
              <td className="nm">Auxiliar de andén</td>
              <td className="mono">4 / 6</td>
              <td>
                <span className="pill ok">
                  <i></i>En proceso
                </span>
              </td>
              <td className="mono">30 ago 2026</td>
              <td>
                <span className="pill ba">
                  <i></i>2 días de retraso
                </span>
              </td>
              <td className="dim">→</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="kpis" style={{ marginTop: 20 }}>
        <div className="kpi">
          <div className="v">3</div>
          <div className="k">Vacantes abiertas en mi área</div>
        </div>
        <div className="kpi acc">
          <div className="v">9 días</div>
          <div className="k">Tiempo promedio de cobertura este trimestre</div>
        </div>
        <div className="kpi">
          <div className="v">83%</div>
          <div className="k">Cubiertas antes de la fecha que pedí</div>
        </div>
      </div>
    </div>
  );
}
