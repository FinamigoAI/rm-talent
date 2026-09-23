import { useNavigate } from 'react-router-dom';
import { useSetCrumb } from '../../contexts/CrumbContext';
import { useToast } from '../../contexts/ToastContext';

export function DetalleSolicitud() {
  useSetCrumb('SOL-2091');
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <div>
      <button
        className="btn quiet sm"
        onClick={() => navigate('/app/bandeja')}
        style={{ marginBottom: 12 }}
      >
        ← Solicitudes
      </button>
      <div className="phead rowsplit">
        <div>
          <h1>SOL-2091 · Cajero de Banco</h1>
          <p>Solicitada por Mónica Herrera el 28 de agosto · Operaciones, Sucursal Centro</p>
        </div>
        <span className="pill wa">
          <i></i>Por revisar
        </span>
      </div>
      <div className="expgrid">
        <div className="stack g20">
          <div className="sect">
            <header>
              <h4>Lo que pidió el líder</h4>
            </header>
            <div className="itm">
              <div className="t">
                <b>3 plazas</b>
                <span>Reemplazo por rotación de personal en la sucursal</span>
              </div>
            </div>
            <div className="itm">
              <div className="t">
                <b>15 de septiembre de 2026</b>
                <span>Fecha requerida · faltan 14 días</span>
              </div>
              <span className="pill wa">
                <i></i>Ajustado
              </span>
            </div>
            <div className="itm">
              <div className="t">
                <b>Sucursal Centro</b>
                <span>Centro de trabajo</span>
              </div>
            </div>
            <div className="itm">
              <div className="t">
                <b>Notas al perfil</b>
                <span>
                  «Que ya tenga experiencia real en manejo de efectivo, no solo en mostrador. Buen
                  trato con el cliente.»
                </span>
              </div>
            </div>
          </div>
          <div className="sect">
            <header>
              <h4>Heredado del catálogo de puestos</h4>
              <span className="ruleref">solo lectura</span>
            </header>
            <div className="itm">
              <div className="t">
                <b>Descripción</b>
                <span>
                  Atención en ventanilla, manejo de efectivo, depósitos y retiros, y apoyo en
                  operaciones bancarias básicas.
                </span>
              </div>
            </div>
            <div className="itm">
              <div className="t">
                <b>Rango salarial</b>
                <span>$11,400 – $14,200 mensuales brutos</span>
              </div>
            </div>
            <div className="itm">
              <div className="t">
                <b>Nivel de riesgo del puesto</b>
                <span>Alto · maneja equipo pesado en piso compartido</span>
              </div>
              <span className="pill ba">
                <i></i>Alto
              </span>
            </div>
          </div>
        </div>
        <div className="stack g16">
          <div className="sect">
            <header>
              <h4>Tu decisión</h4>
            </header>
            <div className="pad stack g12">
              <button className="btn" onClick={() => navigate('/app/cfg')}>
                Procede · configurar la vacante
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <button
                className="btn ghost"
                onClick={() =>
                  toast(
                    'Se pediría un motivo escrito y la solicitud regresaría a Mónica Herrera',
                  )
                }
              >
                Pedir aclaración
              </button>
              <button
                className="btn ghost"
                onClick={() => toast('Rechazar exige motivo escrito; queda en la bitácora')}
              >
                Rechazar con motivo
              </button>
              <p className="tiny dim">
                Pedir aclaración y rechazar exigen motivo escrito. Sin motivo no se puede guardar.
              </p>
            </div>
          </div>
          <div className="note">
            <b>Riesgo alto.</b> El nivel del puesto obliga a un mínimo de validaciones que no
            podrás desactivar al configurar: identidad, listas restrictivas y antecedentes.
          </div>
        </div>
      </div>
    </div>
  );
}
