import { useNavigate } from 'react-router-dom';
import { useSetCrumb } from '../../contexts/CrumbContext';
import { useToast } from '../../contexts/ToastContext';

function CheckDot() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function NowDot() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LiderDetalle() {
  useSetCrumb('VAC-1184');
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <div>
      <button
        className="btn quiet sm"
        onClick={() => navigate('/app/lider')}
        style={{ marginBottom: 12 }}
      >
        ← Mis vacantes
      </button>
      <div className="phead rowsplit">
        <div>
          <h1>VAC-1184 · Cajero de Banco</h1>
          <p>Pedida el 28 de agosto para el 15 de septiembre · 3 plazas · Sucursal Centro</p>
        </div>
        <span className="pill ok">
          <i></i>1 de 3 plazas cubierta
        </span>
      </div>
      <div className="expgrid">
        <div className="stack g20">
          <div className="sect">
            <header>
              <h4>En qué va</h4>
            </header>
            <div className="pad">
              <div className="tl">
                <div className="tlitem done">
                  <span className="dt">
                    <CheckDot />
                  </span>
                  <div>
                    <b>Solicitud enviada</b>
                    <span>28 de agosto · sin paso de autorización</span>
                  </div>
                </div>
                <div className="tlitem done">
                  <span className="dt">
                    <CheckDot />
                  </span>
                  <div>
                    <b>Aceptada y configurada por Patricia Salazar</b>
                    <span>28 de agosto</span>
                  </div>
                </div>
                <div className="tlitem done">
                  <span className="dt">
                    <CheckDot />
                  </span>
                  <div>
                    <b>Publicada · 68 postulaciones</b>
                    <span>1 de septiembre</span>
                  </div>
                </div>
                <div className="tlitem now">
                  <span className="dt">
                    <NowDot />
                  </span>
                  <div>
                    <b>En decisión · 5 candidatos listos</b>
                    <span>Hoy · una plaza ya cubierta</span>
                  </div>
                </div>
                <div className="tlitem">
                  <span className="dt"></span>
                  <div>
                    <b>Contratación de las 3 plazas</b>
                    <span>Meta: 15 de septiembre</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sect">
            <header>
              <h4>Candidato propuesto para la plaza 2</h4>
            </header>
            <div className="itm">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </div>
              <div className="t">
                <b>Ricardo Ontiveros Salas</b>
                <span>Match 72% contra el perfil que pediste</span>
              </div>
              <button
                className="btn ghost sm"
                onClick={() => toast('Se agendaría la entrevista final contigo')}
              >
                Agendar entrevista
              </button>
            </div>
            <div className="crits">
              <div className="critline">
                <span className="mk y">✓</span> Bachillerato concluido
              </div>
              <div className="critline">
                <span className="mk y">✓</span> Experiencia en manejo de efectivo
              </div>
              <div className="critline">
                <span className="mk y">✓</span> Actitud de servicio y atención a clientes
              </div>
              <div className="critline">
                <span className="mk n">✕</span> Experiencia previa en manejo de caja bancaria{' '}
                <span className="tag pill ne">Brecha a preguntar</span>
              </div>
              <div className="critline">
                <span className="mk n">✕</span> Domicilio a menos de 20 km{' '}
                <span className="tag pill ne">31 km</span>
              </div>
            </div>
          </div>
        </div>
        <div className="stack g16">
          <div className="sect">
            <header>
              <h4>Candidatos por etapa</h4>
            </header>
            <div className="itm">
              <div className="t">
                <b>68</b>
                <span>Se postularon</span>
              </div>
            </div>
            <div className="itm">
              <div className="t">
                <b>5</b>
                <span>Listos para decidir</span>
              </div>
            </div>
            <div className="itm">
              <div className="t">
                <b>1</b>
                <span>Contratada</span>
              </div>
            </div>
          </div>
          <div className="note warn">
            <b>Lo que no ves, y es a propósito.</b> No hay acceso a documentos, resultados de
            validación ni hallazgos de riesgo de ningún candidato — ni en pantalla, ni en
            exportación, ni en las notificaciones que te llegan. Ves el avance y el Match de tus
            propias vacantes.
          </div>
          <button
            className="btn ghost"
            style={{ justifyContent: 'center' }}
            onClick={() => navigate('/app/tablero')}
          >
            Volver a la vista del reclutador
          </button>
        </div>
      </div>
    </div>
  );
}
