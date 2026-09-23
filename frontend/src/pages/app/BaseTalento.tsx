import { useSetCrumb } from '../../contexts/CrumbContext';

export function BaseTalento() {
  useSetCrumb('Base de talento');

  return (
    <div>
      <div className="phead">
        <h1>Descartados y base de talento</h1>
        <p>
          Nadie se pierde. Los cerrados por el sistema no entran al tablero de decisión, pero quedan
          con su motivo y, si consintieron, disponibles para vacantes compatibles.
        </p>
      </div>

      <div className="kpis">
        <div className="kpi">
          <div className="v">31</div>
          <div className="k">Cerrados en pre-filtro</div>
        </div>
        <div className="kpi">
          <div className="v">2</div>
          <div className="k">Cerrados por identidad o listas</div>
        </div>
        <div className="kpi">
          <div className="v">14</div>
          <div className="k">Incompletos por documentación</div>
        </div>
        <div className="kpi ia">
          <div className="v">38</div>
          <div className="k">Con consentimiento para reuso</div>
        </div>
      </div>

      <div className="tblwrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Candidato</th>
              <th>Motivo del cierre</th>
              <th>Quién cerró</th>
              <th>Validaciones vigentes</th>
              <th>Reuso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="nm">Gerardo Peña Uribe</td>
              <td>No cumple criterio obligatorio: bachillerato concluido</td>
              <td>
                <span className="pill ai">Sistema</span>
              </td>
              <td className="dim">Ninguna · no se pagó</td>
              <td>
                <span className="pill ok">
                  <i></i>Autorizado
                </span>
              </td>
            </tr>
            <tr>
              <td className="nm">Brenda Islas Cordero</td>
              <td>No cumple criterio obligatorio: disponibilidad nocturna</td>
              <td>
                <span className="pill ai">Sistema</span>
              </td>
              <td className="dim">Ninguna · no se pagó</td>
              <td>
                <span className="pill ok">
                  <i></i>Autorizado
                </span>
              </td>
            </tr>
            <tr>
              <td className="nm">Óscar Lomelí Tapia</td>
              <td>Identidad no confirmada · el documento y la selfie no son la misma persona</td>
              <td>
                <span className="pill ai">Sistema</span>
              </td>
              <td className="mono">Identidad</td>
              <td>
                <span className="pill ne">No aplica</span>
              </td>
            </tr>
            <tr>
              <td className="nm">Fernando Uriostegui Lara</td>
              <td>Coincidencia en listas restrictivas · impedimento normativo</td>
              <td>
                <span className="pill ai">Sistema</span>
              </td>
              <td className="mono">Identidad, listas</td>
              <td>
                <span className="pill ne">No aplica</span>
              </td>
            </tr>
            <tr>
              <td className="nm">Yazmín Cabral Herrera</td>
              <td>Documentación incompleta · agotó la ventana de corrección</td>
              <td>
                <span className="pill ai">Sistema</span>
              </td>
              <td className="mono">Documental</td>
              <td>
                <span className="pill ok">
                  <i></i>Autorizado
                </span>
              </td>
            </tr>
            <tr>
              <td className="nm">Raúl Meneses Aguilar</td>
              <td>Descartado en revisión · «no acreditó experiencia en andén»</td>
              <td>
                <span className="pill ne">Patricia Salazar</span>
              </td>
              <td className="mono">Las 6 · vigentes 87 días</td>
              <td>
                <span className="pill ok">
                  <i></i>Autorizado
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="note" style={{ marginTop: 16 }}>
        <b>Sin orden por Match.</b> Esta lista reúne candidatos de vacantes distintas, y el Match se
        calcula contra los criterios de una vacante específica: comparar el 78% de una con el 64% de
        otra no significa nada.
      </div>
    </div>
  );
}
