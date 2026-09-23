import { useState, type CSSProperties } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetCrumb } from '../../contexts/CrumbContext';
import { useToast } from '../../contexts/ToastContext';
import { useCandidates } from '../../contexts/CandidatesContext';
import { Modal } from '../../components/Modal';
import {
  RESULTADO_VALIDACION_PILL,
  SEM_COLOR,
  SEM_LABEL,
  SEM_PILL,
  hallazgosAbiertos,
  hallazgosResueltos,
  semOf,
  type TipoResolucion,
} from '../../data/candidatos';

export function Expediente() {
  useSetCrumb('Expediente');
  const navigate = useNavigate();
  const toast = useToast();
  const { id = '' } = useParams<{ id: string }>();
  const { candidatos, resolverHallazgo } = useCandidates();
  const c = candidatos[id];

  const [resolviendo, setResolviendo] = useState<number | null>(null);
  const [tipoResolucion, setTipoResolucion] = useState<TipoResolucion>('aclarado');
  const [motivoResolucion, setMotivoResolucion] = useState('');
  const [descartando, setDescartando] = useState(false);
  const [motivoDescarte, setMotivoDescarte] = useState('');

  if (!c) {
    return (
      <div className="phead">
        <h1>Expediente</h1>
        <p>No se encontró al candidato «{id}».</p>
      </div>
    );
  }

  const sem = semOf(c);
  const abiertos = hallazgosAbiertos(c);
  const resueltos = hallazgosResueltos(c);
  const abiertosAmbar = c.hallazgos.filter((f) => !f.resolucion && f.sev === 'ambar').length;

  const semnote = c.indet
    ? 'No se puede definir hasta resolver la identidad'
    : resueltos.length
      ? `${abiertos.length} abierto(s) · ${resueltos.length} resuelto(s), conservados en el expediente`
      : sem === 'verde'
        ? 'Sin hallazgos'
        : 'Hallazgos abiertos por resolver';

  function abrirResolver(index: number) {
    setResolviendo(index);
    setTipoResolucion('aclarado');
    setMotivoResolucion('');
  }

  function confirmarResolver() {
    if (resolviendo === null || motivoResolucion.trim().length < 8) return;
    // el semáforo resultante se calcula antes de mutar, igual que el prototipo
    // (doResolver muta y luego llama semOf), sin depender del timing de setState
    const hallazgosDespues = c.hallazgos.map((h, i) =>
      i === resolviendo ? { ...h, resolucion: 'x' } : h,
    );
    const semDespues = semOf({ ...c, hallazgos: hallazgosDespues });
    resolverHallazgo(id, resolviendo, tipoResolucion, motivoResolucion.trim());
    setResolviendo(null);
    toast(
      semDespues === 'verde'
        ? 'Hallazgo resuelto · el semáforo pasó a verde, con el resuelto a la vista'
        : 'Hallazgo resuelto · queda en el expediente con tu motivo',
    );
  }

  function confirmarDescarte() {
    if (motivoDescarte.trim().length < 8) return;
    setDescartando(false);
    setMotivoDescarte('');
    toast('Candidato descartado con motivo · registrado en la bitácora');
  }

  return (
    <div>
      <button className="btn quiet sm" style={{ marginBottom: 12 }} onClick={() => navigate('/app/tablero')}>
        ← Tablero
      </button>

      <div className="phead exphead">
        <div className="who">
          <h1>{c.nombre}</h1>
          <p>{c.subtitulo}</p>
        </div>
        <div className="scores">
          <div className="score">
            <span className="lbl">Match contra el perfil</span>
            <span className="v">{c.match}%</span>
            <div className="meterbar" style={{ marginTop: 8 }}>
              <i style={{ width: `${c.match}%` }}></i>
            </div>
          </div>
          <div className="score sem" style={{ '--sc': SEM_COLOR[sem] } as CSSProperties}>
            <span className="lbl">Nivel de riesgo</span>
            <span className="v" style={{ color: SEM_COLOR[sem] }}>
              {SEM_LABEL[sem]}
            </span>
            <p className="tiny dim" style={{ marginTop: 4 }}>
              {semnote}
            </p>
          </div>
        </div>
      </div>

      <div className="expgrid">
        <div className="stack g20">
          <div className="sect">
            <header>
              <h4>Hallazgos</h4>
              <span className="ruleref">{c.hallazgos.length ? `${c.hallazgos.length} en total` : 'ninguno'}</span>
            </header>
            <div>
              {c.hallazgos.length === 0 && (
                <div className="pad small muted">El expediente salió limpio. Ninguna validación levantó bandera.</div>
              )}
              {c.hallazgos.map((f, i) => (
                <div className="find" key={i}>
                  <div className="hd">
                    <b>{f.titulo}</b>
                    {f.resolucion ? (
                      <span className="pill ok">
                        <i></i>Resuelto
                      </span>
                    ) : f.sev === 'indet' ? (
                      <span className="pill ai">No se pudo evaluar</span>
                    ) : (
                      <span className="pill wa">
                        <i></i>Abierto
                      </span>
                    )}
                    <span className="ruleref">{f.sev === 'indet' ? 'no cierra' : 'solo marca'}</span>
                  </div>
                  <div className="ev">
                    <em>{f.origen}</em>
                    {f.evidencia}
                  </div>
                  {f.resolucion ? (
                    <div
                      className="ev"
                      style={{
                        borderColor: 'color-mix(in srgb,var(--ok) 30%,transparent)',
                        background: 'var(--ok-soft)',
                      }}
                    >
                      <em>Resuelto por Patricia Salazar · hoy</em>
                      {f.resolucion}
                    </div>
                  ) : f.sev === 'indet' ? (
                    <div className="acts">
                      <button
                        className="btn ghost sm"
                        onClick={() =>
                          toast('Se le pediría al candidato repetir la captura, sin cerrar su postulación')
                        }
                      >
                        Pedir nueva captura
                      </button>
                      <button
                        className="btn quiet sm"
                        onClick={() =>
                          toast('Un resultado indeterminado nunca se convierte en rechazo automático')
                        }
                      >
                        ¿Por qué no se cerró?
                      </button>
                    </div>
                  ) : (
                    <div className="acts">
                      <button className="btn sm" onClick={() => abrirResolver(i)}>
                        Resolver con motivo
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="sect">
            <header>
              <h4>Validaciones ejecutadas</h4>
              <span className="ruleref">con su origen y evidencia</span>
            </header>
            <div>
              {c.validaciones.map((v, i) => {
                const info = RESULTADO_VALIDACION_PILL[v.resultado];
                return (
                  <div className="itm" key={i}>
                    <div className="ico">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6l-8-3Z" />
                      </svg>
                    </div>
                    <div className="t">
                      <b>{v.titulo}</b>
                      <span>{v.detalle}</span>
                    </div>
                    <div className="stack" style={{ alignItems: 'flex-end', gap: 3 }}>
                      <span className={`pill ${info.tipo}`}>
                        {info.dot && <i></i>}
                        {info.texto}
                      </span>
                      <span className="tiny dim mono">
                        {v.proveedor} · {v.costo}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sect">
            <header>
              <h4>Documentos</h4>
              <span className="ruleref">validados y cruzados entre sí</span>
            </header>
            <div>
              {c.documentos.map((d, i) => (
                <div className="itm" key={i}>
                  <div
                    className="ico"
                    style={{ background: 'var(--ok-soft)', borderColor: 'transparent', color: 'var(--ok)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="t">
                    <b>{d.nombre}</b>
                    <span>{d.detalle}</span>
                  </div>
                  <button
                    className="btn quiet sm"
                    onClick={() => toast('Se abriría el documento con liga firmada de un solo uso')}
                  >
                    Ver
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="sect">
            <header>
              <h4>Bitácora</h4>
              <span className="ruleref">solo agrega, nunca edita</span>
            </header>
            <div className="log">
              {c.bitacora
                .slice()
                .reverse()
                .map((e, i) => (
                  <div className="logline" key={i}>
                    <time>{e.fecha}</time>
                    <div>
                      <b>{e.evento}</b> <span className="who">{e.quien}</span>
                      <br />
                      <span>{e.detalle}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="stack g16">
          <div className="sect">
            <header>
              <h4>Criterios del perfil</h4>
            </header>
            <div className="crits">
              {c.criterios.map((cr, i) => (
                <div className="critline" key={i}>
                  <span className={`mk ${cr.marca}`}>{cr.marca === 'n' ? '✕' : '✓'}</span> {cr.texto}
                  <span className="tag pill ne">{cr.etiqueta}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sect">
            <header>
              <h4>Consentimientos</h4>
            </header>
            <div className="itm">
              <div className="t">
                <b>Aviso de privacidad v2.1</b>
                <span>Aceptado el 30 ago 2026, 19:41</span>
              </div>
              <span className="pill ok">
                <i></i>Sí
              </span>
            </div>
            <div className="itm">
              <div className="t">
                <b>Uso del perfil en vacantes compatibles</b>
                <span>Casilla separada y opcional</span>
              </div>
              <span className="pill ok">
                <i></i>Sí
              </span>
            </div>
          </div>

          <div className="stack g8">
            {c.indet ? (
              <>
                <button className="btn" disabled>
                  Avanzar a entrevista
                </button>
                <button className="btn ghost" onClick={() => setDescartando(true)}>
                  Descartar con motivo
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn"
                  style={{ justifyContent: 'center' }}
                  onClick={() => navigate(`/app/entrevista/${id}`)}
                >
                  Avanzar a entrevista
                </button>
                <button
                  className="btn ghost"
                  style={{ justifyContent: 'center' }}
                  onClick={() => setDescartando(true)}
                >
                  Descartar con motivo
                </button>
              </>
            )}
          </div>

          <div className="note">
            {c.indet ? (
              <>
                <b>No se puede avanzar todavía.</b> La identidad quedó sin poder evaluarse. No es un
                rechazo y por eso el sistema no cerró la postulación: hay que resolverla antes de
                considerarla para la plaza.
              </>
            ) : abiertosAmbar ? (
              <>
                <b>
                  Tiene {abiertosAmbar} hallazgo{abiertosAmbar > 1 ? 's' : ''} abierto
                  {abiertosAmbar > 1 ? 's' : ''}.
                </b>{' '}
                Puedes avanzar, pero el hallazgo seguirá visible en el expediente hasta que lo
                resuelvas con un motivo escrito. Un Match alto no lo apaga.
              </>
            ) : (
              <>
                <b>La decisión es tuya.</b> El sistema no preselecciona ninguna acción, y lo que
                elijas queda en la bitácora con tu nombre y tu motivo.
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={resolviendo !== null}
        onClose={() => setResolviendo(null)}
        title="Resolver hallazgo"
        subtitle={resolviendo !== null ? `${c.hallazgos[resolviendo].titulo} · ${c.hallazgos[resolviendo].origen}` : undefined}
        footer={
          <>
            <button className="btn ghost" onClick={() => setResolviendo(null)}>
              Cancelar
            </button>
            <button className="btn" disabled={motivoResolucion.trim().length < 8} onClick={confirmarResolver}>
              Resolver hallazgo
            </button>
          </>
        }
      >
        <div className="radios">
          <label>
            <input
              type="radio"
              name="des"
              checked={tipoResolucion === 'aclarado'}
              onChange={() => setTipoResolucion('aclarado')}
            />
            <span>
              <b>Aclarado</b>
              <span>Lo verifiqué por otra vía y no representa un riesgo</span>
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="des"
              checked={tipoResolucion === 'asumido'}
              onChange={() => setTipoResolucion('asumido')}
            />
            <span>
              <b>Asumido con conocimiento</b>
              <span>Sigue siendo un riesgo y decido continuar de todas formas</span>
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="des"
              checked={tipoResolucion === 'pendiente'}
              onChange={() => setTipoResolucion('pendiente')}
            />
            <span>
              <b>Requiere seguimiento después de la contratación</b>
              <span>Se resuelve, pero queda una tarea abierta</span>
            </span>
          </label>
        </div>
        <div>
          <span className="lbl">Motivo · obligatorio</span>
          <textarea
            value={motivoResolucion}
            onChange={(e) => setMotivoResolucion(e.target.value)}
            placeholder="Qué averiguaste y por qué esto se puede cerrar."
          />
          <p className="tiny dim" style={{ marginTop: 6 }}>
            Resolver no borra el hallazgo: queda marcado como resuelto, con su evidencia y tu motivo,
            en el expediente y en la bitácora.
          </p>
        </div>
      </Modal>

      <Modal
        open={descartando}
        onClose={() => setDescartando(false)}
        title="Descartar candidato"
        subtitle={`${c.nombre} · VAC-1184`}
        footer={
          <>
            <button className="btn ghost" onClick={() => setDescartando(false)}>
              Cancelar
            </button>
            <button className="btn" disabled={motivoDescarte.trim().length < 8} onClick={confirmarDescarte}>
              Descartar
            </button>
          </>
        }
      >
        <div>
          <span className="lbl">Motivo · obligatorio</span>
          <textarea
            value={motivoDescarte}
            onChange={(e) => setMotivoDescarte(e.target.value)}
            placeholder="Por qué no continúa. Queda en la bitácora con tu nombre."
          />
          <p className="tiny dim" style={{ marginTop: 6 }}>
            Es una decisión de persona, no del sistema. El candidato recibe un mensaje respetuoso,
            sin el detalle interno.
          </p>
        </div>
      </Modal>
    </div>
  );
}

