import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetCrumb } from '../../contexts/CrumbContext';
import { useToast } from '../../contexts/ToastContext';
import { useCandidates } from '../../contexts/CandidatesContext';
import { Modal } from '../../components/Modal';

export function GuiaEntrevista() {
  useSetCrumb('Guía de entrevista');
  const navigate = useNavigate();
  const toast = useToast();
  const { id = '' } = useParams<{ id: string }>();
  const { candidatos } = useCandidates();
  const c = candidatos[id];

  const [notas, setNotas] = useState('');
  const [descartando, setDescartando] = useState(false);
  const [motivoDescarte, setMotivoDescarte] = useState('');

  if (!c) {
    return (
      <div className="phead">
        <h1>Guía de entrevista</h1>
        <p>No se encontró al candidato «{id}».</p>
      </div>
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
      <button className="btn quiet sm" style={{ marginBottom: 12 }} onClick={() => navigate(`/app/exp/${id}`)}>
        ← Expediente
      </button>
      <div className="phead">
        <h1>
          Guía de entrevista · <span>{c.nombre}</span>
        </h1>
        <p>Las brechas ya están identificadas. Entra a preguntar lo que falta, no a descubrirlo.</p>
      </div>

      <div className="expgrid">
        <div className="stack g20">
          <div className="sect">
            <header>
              <h4>Brechas de perfil que bajaron el Match</h4>
            </header>
            <div className="find">
              <div className="hd">
                <b>Experiencia previa en manejo de caja bancaria</b>
                <span className="pill ne">No cumple</span>
              </div>
              <div className="ev">
                <em>Qué preguntar</em>
                Declaró experiencia en retráctil y patín, no en contrapeso. Vale la pena confirmar si
                operó contrapeso sin certificarlo y cuánto tiempo, porque es justo lo que pidió Mónica
                en las notas al perfil.
              </div>
            </div>
            <div className="find">
              <div className="hd">
                <b>Domicilio a menos de 20 km de la sucursal</b>
                <span className="pill ne">No cumple</span>
              </div>
              <div className="ev">
                <em>Qué preguntar</em>
                Vive a 31 km. El traslado a primera hora puede ser un tema: cómo llegaría a las 8:30
                de la mañana y si le interesa el apoyo de transporte.
              </div>
            </div>
          </div>

          <div className="sect">
            <header>
              <h4>Hallazgos que conviene conversar</h4>
            </header>
            <div>
              {c.hallazgos.length === 0 ? (
                <div className="pad small muted">Sin hallazgos que conversar.</div>
              ) : (
                c.hallazgos.map((f, i) => (
                  <div className="find" key={i}>
                    <div className="hd">
                      <b>{f.titulo}</b>
                      {f.resolucion ? (
                        <span className="pill ok">
                          <i></i>Resuelto
                        </span>
                      ) : (
                        <span className="pill wa">
                          <i></i>Abierto
                        </span>
                      )}
                    </div>
                    <div className="ev">
                      <em>{f.origen}</em>
                      {f.evidencia}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="sect">
            <header>
              <h4>Notas de la entrevista</h4>
            </header>
            <div className="pad">
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Lo que registres aquí queda en el expediente y en la bitácora."
                style={{
                  width: '100%',
                  minHeight: 90,
                  padding: '10px 12px',
                  borderRadius: 7,
                  border: '1px solid var(--line)',
                  background: 'var(--tint)',
                  color: 'var(--ink)',
                  font: 'inherit',
                }}
              />
            </div>
          </div>
        </div>

        <div className="stack g16">
          <div className="sect">
            <header>
              <h4>Participantes</h4>
            </header>
            <div className="itm">
              <div className="t">
                <b>Patricia Salazar</b>
                <span>Reclutamiento · ve todo el expediente</span>
              </div>
            </div>
            <div className="itm">
              <div className="t">
                <b>Mónica Herrera</b>
                <span>Líder de Operaciones · ve puesto, Match y brechas</span>
              </div>
              <span className="pill ne">Sin documentos</span>
            </div>
          </div>
          <button className="btn" style={{ justifyContent: 'center' }} onClick={() => navigate('/app/cierre')}>
            Seleccionar y contratar →
          </button>
          <button className="btn ghost" style={{ justifyContent: 'center' }} onClick={() => setDescartando(true)}>
            Descartar con motivo
          </button>
          <div className="note">
            <b>Mónica entra a la entrevista</b> sabiendo el puesto, el Match y las brechas de perfil.
            Nunca vio un documento ni un hallazgo de validación, y así queda registrado.
          </div>
        </div>
      </div>

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
