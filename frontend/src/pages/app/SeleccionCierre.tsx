import { useNavigate } from 'react-router-dom';
import { useSetCrumb } from '../../contexts/CrumbContext';
import { useToast } from '../../contexts/ToastContext';

export function SeleccionCierre() {
  useSetCrumb('Selección y cierre');
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <div>
      <div className="phead">
        <h1>Selección y cierre · VAC-1184</h1>
        <p>3 plazas. La vacante permanece abierta hasta cubrir la última.</p>
      </div>

      <div className="expgrid">
        <div className="stack g20">
          <div className="sect">
            <header>
              <h4>Plazas</h4>
              <span className="ruleref">cada contratación cierra solo su plaza</span>
            </header>
            <div className="itm">
              <div
                className="ico"
                style={{ background: 'var(--ok-soft)', borderColor: 'transparent', color: 'var(--ok)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div className="t">
                <b>Plaza 1 · Ana Karen Rosales Ibarra</b>
                <span>Ingreso propuesto: 8 de septiembre de 2026</span>
              </div>
              <span className="pill ok">
                <i></i>Contratada
              </span>
            </div>
            <div className="itm">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </div>
              <div className="t">
                <b>Plaza 2</b>
                <span>Sin cubrir · 4 expedientes disponibles en el tablero</span>
              </div>
              <span className="pill wa">
                <i></i>Abierta
              </span>
            </div>
            <div className="itm">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </div>
              <div className="t">
                <b>Plaza 3</b>
                <span>Sin cubrir</span>
              </div>
              <span className="pill wa">
                <i></i>Abierta
              </span>
            </div>
          </div>

          <div className="sect">
            <header>
              <h4>Expediente que entra con el colaborador</h4>
            </header>
            <div className="itm">
              <div className="t">
                <b>5 documentos validados y cruzados</b>
              </div>
              <span className="pill ok">
                <i></i>Completo
              </span>
            </div>
            <div className="itm">
              <div className="t">
                <b>6 validaciones con evidencia y proveedor</b>
              </div>
              <span className="pill ok">
                <i></i>Completo
              </span>
            </div>
            <div className="itm">
              <div className="t">
                <b>1 hallazgo resuelto por persona, con motivo</b>
              </div>
              <span className="pill ok">
                <i></i>Registrado
              </span>
            </div>
            <div className="itm">
              <div className="t">
                <b>Consentimientos con versión, fecha y hora</b>
              </div>
              <span className="pill ok">
                <i></i>Registrado
              </span>
            </div>
            <div className="itm">
              <div className="t">
                <b>Bitácora de 23 eventos</b>
                <span>Auditable de punta a punta</span>
              </div>
              <button
                className="btn ghost sm"
                onClick={() => toast('Se exportaría el expediente completo en formato imprimible')}
              >
                Exportar
              </button>
            </div>
          </div>
        </div>

        <div className="stack g16">
          <div className="sect">
            <header>
              <h4>Aviso a los demás candidatos</h4>
            </header>
            <div className="pad small muted">
              Se enviará al cubrirse la última plaza, no ahora: la vacante sigue abierta.
              <div className="linkbox" style={{ marginTop: 10, whiteSpace: 'normal' }}>
                «Gracias por tu interés en la vacante de Cajero de Banco. En esta ocasión el proceso
                se cerró con otra persona. Tu perfil queda disponible para vacantes compatibles.»
              </div>
              <p className="tiny dim" style={{ marginTop: 8 }}>
                Sin datos de terceros y sin detalle interno de la evaluación.
              </p>
            </div>
          </div>
          <div className="note ok">
            <b>Días contra la fecha requerida:</b> Mónica pidió la vacante el 28 de agosto para el 15
            de septiembre. La primera plaza se cubrió en 4 días.
          </div>
          <button className="btn ghost" style={{ justifyContent: 'center' }} onClick={() => navigate('/app/tablero')}>
            Volver al tablero por la plaza 2
          </button>
        </div>
      </div>
    </div>
  );
}
