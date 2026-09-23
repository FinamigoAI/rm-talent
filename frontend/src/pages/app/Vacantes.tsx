import { useNavigate } from 'react-router-dom';
import { useSetCrumb } from '../../contexts/CrumbContext';
import { useToast } from '../../contexts/ToastContext';

export function Vacantes() {
  useSetCrumb('Vacantes');
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <div>
      <div className="phead">
        <h1>Mis vacantes</h1>
        <p>Cartera de la Sucursal Centro y Sucursal Vallejo.</p>
      </div>
      <div className="tblwrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Folio</th>
              <th>Puesto</th>
              <th>Plazas</th>
              <th>Postulaciones</th>
              <th>En decisión</th>
              <th>Días abierta</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="clickable" onClick={() => navigate('/app/tablero')}>
              <td className="mono">VAC-1184</td>
              <td className="nm">Cajero de Banco</td>
              <td className="mono">0 / 3</td>
              <td className="mono">68</td>
              <td className="mono">5</td>
              <td className="mono">4</td>
              <td>
                <span className="pill ok">
                  <i></i>En proceso
                </span>
              </td>
            </tr>
            <tr className="clickable" onClick={() => toast('En esta demo solo está armada VAC-1184')}>
              <td className="mono">VAC-1179</td>
              <td className="nm">Analista de inventarios</td>
              <td className="mono">1 / 1</td>
              <td className="mono">41</td>
              <td className="mono">0</td>
              <td className="mono">19</td>
              <td>
                <span className="pill ne">Cerrada por contratación</span>
              </td>
            </tr>
            <tr className="clickable" onClick={() => toast('En esta demo solo está armada VAC-1184')}>
              <td className="mono">VAC-1176</td>
              <td className="nm">Auxiliar de andén</td>
              <td className="mono">4 / 6</td>
              <td className="mono">112</td>
              <td className="mono">7</td>
              <td className="mono">26</td>
              <td>
                <span className="pill ok">
                  <i></i>En proceso
                </span>
              </td>
            </tr>
            <tr className="clickable" onClick={() => toast('En esta demo solo está armada VAC-1184')}>
              <td className="mono">VAC-1168</td>
              <td className="nm">Chofer reparto local</td>
              <td className="mono">2 / 2</td>
              <td className="mono">76</td>
              <td className="mono">0</td>
              <td className="mono">38</td>
              <td>
                <span className="pill ne">Cerrada por contratación</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
