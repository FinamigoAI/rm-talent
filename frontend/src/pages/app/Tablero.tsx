import { useNavigate } from 'react-router-dom';
import { useSetCrumb } from '../../contexts/CrumbContext';
import { useCandidates } from '../../contexts/CandidatesContext';
import { ORDER, SEM_LABEL, SEM_PILL, hallazgosAbiertos, hallazgosResueltos, semOf } from '../../data/candidatos';

export function Tablero() {
  useSetCrumb('Tablero de candidatos');
  const navigate = useNavigate();
  const { candidatos } = useCandidates();

  return (
    <div>
      <div className="phead rowsplit">
        <div>
          <h1>Tablero de candidatos · VAC-1184</h1>
          <p>Cajero de Banco · 3 plazas · Solo llegan aquí los que pasaron los tres cortes.</p>
        </div>
        <span className="pill ne mono">68 postulaciones</span>
      </div>

      <div className="kpis">
        <div className="kpi">
          <div className="v">68</div>
          <div className="k">Postulaciones recibidas</div>
        </div>
        <div className="kpi acc">
          <div className="v">31</div>
          <div className="k">Cerradas en pre-filtro, sin pedir un documento</div>
        </div>
        <div className="kpi">
          <div className="v">14</div>
          <div className="k">En corrección documental</div>
        </div>
        <div className="kpi ia">
          <div className="v">5</div>
          <div className="k">Expedientes listos para decidir</div>
        </div>
        <div className="kpi">
          <div className="v">$547</div>
          <div className="k">Gasto en validaciones · vs $7,446 sin pre-filtro</div>
        </div>
      </div>

      <div className="tblwrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Candidato</th>
              <th style={{ width: 190 }}>Match</th>
              <th>Riesgo</th>
              <th>Hallazgos abiertos</th>
              <th>Documentos</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ORDER.map((key) => {
              const c = candidatos[key];
              if (!c) return null;
              const sem = semOf(c);
              const semPill = SEM_PILL[sem];
              const abiertos = hallazgosAbiertos(c);
              const resueltos = hallazgosResueltos(c);
              return (
                <tr key={key} className="clickable" onClick={() => navigate(`/app/exp/${key}`)}>
                  <td>
                    <span className="nm">{c.nombre}</span>
                    <br />
                    <span className="tiny dim">{c.subtitulo.split(' · ').slice(1, 3).join(' · ')}</span>
                  </td>
                  <td>
                    <div className="matchcell">
                      <b>{c.match}%</b>
                      <span className="meterbar" style={{ flex: 1 }}>
                        <i style={{ width: `${c.match}%` }}></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`pill ${semPill.tipo}`}>
                      {semPill.dot && <i></i>}
                      {SEM_LABEL[sem]}
                    </span>
                    {resueltos.length > 0 && (
                      <>
                        <br />
                        <span className="tiny dim">
                          {resueltos.length} resuelto{resueltos.length > 1 ? 's' : ''}
                        </span>
                      </>
                    )}
                  </td>
                  <td>
                    {abiertos.length ? (
                      <span className="pill wa">
                        <i></i>
                        {abiertos.length}
                      </span>
                    ) : (
                      <span className="dim">—</span>
                    )}
                    {abiertos.map((f, i) => (
                      <span key={i} className="tiny dim" style={{ display: 'block' }}>
                        {f.titulo}
                      </span>
                    ))}
                  </td>
                  <td className="mono">{c.docs}</td>
                  <td>
                    <span className={`pill ${c.estado.tipo}`}>
                      {c.estado.dot && <i></i>}
                      {c.estado.texto}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="note" style={{ marginTop: 16 }}>
        <b>El Match ordena, no decide.</b> Es el porcentaje de criterios no obligatorios cumplidos,
        todos valiendo igual. Un Match alto no apaga una bandera: por eso el semáforo y los
        hallazgos abiertos viajan siempre junto al número.
      </div>
    </div>
  );
}
