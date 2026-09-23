import { useNavigate } from 'react-router-dom';
import { useSetCrumb } from '../../contexts/CrumbContext';
import { useToast } from '../../contexts/ToastContext';
import { Qr } from '../../components/Qr';

export function Publicada() {
  useSetCrumb('VAC-1184 publicada');
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <div>
      <div className="phead">
        <h1>VAC-1184 publicada</h1>
        <p>Ficha congelada el 1 de septiembre de 2026, 14:32. Ya se puede difundir.</p>
      </div>
      <div className="expgrid">
        <div className="sect">
          <header>
            <h4>Liga y código para difusión</h4>
          </header>
          <div className="pad">
            <div className="qrbox">
              <Qr />
              <div className="stack g12" style={{ flex: 1, minWidth: 220 }}>
                <div>
                  <span className="lbl">Liga pública única</span>
                  <div className="linkbox" style={{ marginTop: 6 }}>
                    talent.bancoalcazar.com.mx/v/8xQ2-KM7T-9F
                  </div>
                </div>
                <div className="flx g8" style={{ flexWrap: 'wrap' }}>
                  <button className="btn ghost sm" onClick={() => toast('Liga copiada')}>
                    Copiar liga
                  </button>
                  <button
                    className="btn ghost sm"
                    onClick={() => toast('QR descargado en formato imprimible')}
                  >
                    Descargar QR
                  </button>
                  <button
                    className="btn quiet sm"
                    onClick={() =>
                      toast(
                        'La liga se revocaría y se generaría otra, sin cerrar la vacante ni perder las postulaciones en curso',
                      )
                    }
                  >
                    Revocar y regenerar
                  </button>
                </div>
                <p className="tiny dim">
                  Vista del código para la demo. Para abrirlo en el teléfono usa la liga de arriba.
                </p>
                <button className="btn ghost sm" onClick={() => navigate('/candidato')}>
                  Abrir la postulación en esta pantalla
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="stack g16">
          <div className="sect">
            <header>
              <h4>Difusión</h4>
            </header>
            <div className="itm">
              <div className="t">
                <b>Bolsa de empleo de la sucursal</b>
                <span>Cartel impreso con QR en caseta</span>
              </div>
              <span className="pill ok">
                <i></i>Activa
              </span>
            </div>
            <div className="itm">
              <div className="t">
                <b>WhatsApp de referidos</b>
                <span>Liga enviada a 34 colaboradores</span>
              </div>
              <span className="pill ok">
                <i></i>Activa
              </span>
            </div>
            <div className="itm">
              <div className="t">
                <b>Portal de empleo externo</b>
                <span>Sin publicar</span>
              </div>
              <span className="pill ne">Inactiva</span>
            </div>
          </div>
          <button
            className="btn"
            style={{ justifyContent: 'center' }}
            onClick={() => navigate('/app/tablero')}
          >
            Ver el tablero de candidatos →
          </button>
          <button
            className="btn ghost"
            style={{ justifyContent: 'center' }}
            onClick={() => navigate('/candidato')}
          >
            Ver cómo se postula un candidato
          </button>
        </div>
      </div>
    </div>
  );
}
