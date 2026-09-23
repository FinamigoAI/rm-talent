import { useNavigate } from 'react-router-dom';
import { useSetCrumb } from '../../contexts/CrumbContext';
import { useToast } from '../../contexts/ToastContext';

export function Bandeja() {
  useSetCrumb('Solicitudes');
  const navigate = useNavigate();
  const toast = useToast();

  const irADemo = () => toast('En esta demo solo está armada SOL-2091');

  return (
    <div>
      <div className="phead">
        <h1>Solicitudes de vacante</h1>
        <p>Llegan directo del líder de área, sin paso de autorización. Tú decides si proceden.</p>
      </div>
      <div className="tblwrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Folio</th>
              <th>Puesto</th>
              <th>Área · centro</th>
              <th>Líder</th>
              <th>Plazas</th>
              <th>Fecha requerida</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="clickable" onClick={() => navigate('/app/solicitud')}>
              <td className="mono">SOL-2091</td>
              <td className="nm">
                Cajero de Banco{' '}
                <span className="pill ba" style={{ marginLeft: 6 }}>
                  <i></i>Riesgo alto
                </span>
              </td>
              <td>Operaciones · Sucursal Centro</td>
              <td>Mónica Herrera</td>
              <td className="mono">3</td>
              <td className="mono">15 sep 2026</td>
              <td>
                <span className="pill wa">
                  <i></i>Por revisar
                </span>
              </td>
            </tr>
            <tr className="clickable" onClick={irADemo}>
              <td className="mono">SOL-2090</td>
              <td className="nm">Auxiliar de almacén</td>
              <td>Operaciones · Sucursal Centro</td>
              <td>Mónica Herrera</td>
              <td className="mono">6</td>
              <td className="mono">22 sep 2026</td>
              <td>
                <span className="pill wa">
                  <i></i>Por revisar
                </span>
              </td>
            </tr>
            <tr className="clickable" onClick={irADemo}>
              <td className="mono">SOL-2088</td>
              <td className="nm">
                Coordinador de rutas{' '}
                <span className="pill ai" style={{ marginLeft: 6 }}>
                  Puesto nuevo
                </span>
              </td>
              <td>Banca · Sucursal Vallejo</td>
              <td>Iván Delgado</td>
              <td className="mono">1</td>
              <td className="mono">1 oct 2026</td>
              <td>
                <span className="pill ne">Requiere alta de puesto</span>
              </td>
            </tr>
            <tr className="clickable" onClick={irADemo}>
              <td className="mono">SOL-2085</td>
              <td className="nm">Analista de inventarios</td>
              <td>Planeación · Corporativo</td>
              <td>Rocío Bañuelos</td>
              <td className="mono">1</td>
              <td className="mono">8 sep 2026</td>
              <td>
                <span className="pill ok">
                  <i></i>Convertida a VAC-1179
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="note" style={{ marginTop: 16 }}>
        <b>SOL-2088 no se puede convertir en vacante todavía.</b> Viaja marcada como «puesto
        nuevo»: el puesto no existe en el catálogo y hay que darlo de alta antes de configurar la
        ficha.
      </div>
    </div>
  );
}
