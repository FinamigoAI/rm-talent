import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import {
  DOCS_VALID,
  EXPLIVE_AT,
  EXPLIVE_LABELS,
  LO_QUE_DEBES_SABER,
  PASOS_ID,
  PSTEP,
  REQUISITOS,
  type EstadoPaso,
} from '../data/candidatoStage';

/* ─── íconos (paths idénticos al prototipo, atributos en camelCase) ─── */

function ShieldIcon({ stroke = '#fff', strokeWidth = 2.2 }: { stroke?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
      <path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6l-8-3Z" />
    </svg>
  );
}

function MarkGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6l-8-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

function CheckIcon({
  strokeWidth = 2.6,
  stroke = 'currentColor',
  linejoin = true,
}: {
  strokeWidth?: number;
  stroke?: string;
  linejoin?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin={linejoin ? 'round' : undefined}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ClockIcon({ strokeWidth = 2 }: { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 9v4M12 17h.01" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function IneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M14 9h4M14 13h4M5 18c1.5-2 4-2 5.5 0" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h5M6 15h8" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 3v5h5" />
      <path d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-4-5Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/* ─── piezas repetidas del teléfono ─── */

function PBar({
  title,
  subtitle,
  bg,
  iconStroke,
  icon,
}: {
  title: string;
  subtitle: string;
  bg?: string;
  iconStroke?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="pbar">
      <span className="sq" style={bg ? { background: bg } : undefined}>
        {icon ?? <ShieldIcon stroke={iconStroke} />}
      </span>
      <span>
        <b>{title}</b>
        <span>{subtitle}</span>
      </span>
    </div>
  );
}

function Prog({ on }: { on: number }) {
  return (
    <div className="prog">
      {[0, 1, 2, 3].map((i) => (
        <i key={i} className={i < on ? 'on' : undefined} />
      ))}
    </div>
  );
}

function StatusIcon({ estado }: { estado: EstadoPaso }) {
  if (estado === 'ok') return <CheckIcon />;
  if (estado === 'doing') return <span className="spin" />;
  return <ClockIcon />;
}

/* ─── componente principal ─── */

const DOTS: Array<{ label: string; dot: number }> = [
  { label: 'La vacante', dot: 0 },
  { label: 'Aviso de privacidad', dot: 1 },
  { label: 'Datos de contacto', dot: 2 },
  { label: 'Resultado del filtro', dot: 3 },
  { label: 'Selfie', dot: 4 },
  { label: 'Identidad, listas y geocerca', dot: 5 },
  { label: 'Documentos y validación', dot: 6 },
  { label: 'Estado de mi postulación', dot: 7 },
  { label: 'Entrevista realizada', dot: 8 },
  { label: 'Bienvenida', dot: 9 },
];

const WAIT_4: EstadoPaso[] = ['wait', 'wait', 'wait', 'wait'];

export function CandidateStage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [panel, setPanel] = useState(1);
  const [dot, setDot] = useState<number | undefined>(PSTEP[1]);
  const [explive, setExplive] = useState<boolean[]>([false, false, false, false]);

  const [consentChecked, setConsentChecked] = useState(false);
  const [rfcPhase, setRfcPhase] = useState<'idle' | 'checking' | 'ok'>('idle');

  const [docsPhase, setDocsPhase] = useState<'idle' | 'validating' | 'done'>('idle');
  const [docStatuses, setDocStatuses] = useState<EstadoPaso[]>(WAIT_4);
  const [showDocExample, setShowDocExample] = useState(false);

  const [idnPhase, setIdnPhase] = useState<'idle' | 'verifying' | 'done'>('idle');
  const [idnStatuses, setIdnStatuses] = useState<EstadoPaso[]>(WAIT_4);

  const [autoRunning, setAutoRunning] = useState(false);

  const stepTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const autoRunningRef = useRef(false);
  const autoIdxRef = useRef(0);
  const pbodyRefs = useRef<Record<number, HTMLDivElement | null>>({});

  function clearStepTimers() {
    stepTimersRef.current.forEach(clearTimeout);
    stepTimersRef.current = [];
  }
  function schedule(ms: number, fn: () => void) {
    stepTimersRef.current.push(setTimeout(fn, ms));
  }

  function goPanel(n: number, dotOverride?: number) {
    clearStepTimers();
    setPanel(n);
    const idx = dotOverride === undefined ? PSTEP[n] : dotOverride;
    setDot(idx);
    if (idx !== undefined) {
      setExplive(EXPLIVE_AT.map((threshold) => idx >= threshold));
    }
  }

  function validarRFC() {
    setRfcPhase('checking');
    schedule(900, () => setRfcPhase('ok'));
  }

  function identidad() {
    goPanel(12, 5);
    setIdnPhase('verifying');
    setIdnStatuses(WAIT_4);
    let t = 400;
    PASOS_ID.forEach((_, i) => {
      schedule(t, () => setIdnStatuses((prev) => prev.map((s, j) => (j === i ? 'doing' : s))));
      t += 1200;
      schedule(t, () => setIdnStatuses((prev) => prev.map((s, j) => (j === i ? 'ok' : s))));
      t += 380;
    });
    schedule(t + 120, () => setIdnPhase('done'));
  }

  function cargarDocs() {
    setDocsPhase('validating');
    setDocStatuses(WAIT_4);
    let t = 350;
    DOCS_VALID.forEach((_, i) => {
      schedule(t, () => setDocStatuses((prev) => prev.map((s, j) => (j === i ? 'doing' : s))));
      t += 1050;
      schedule(t, () => setDocStatuses((prev) => prev.map((s, j) => (j === i ? 'ok' : s))));
      t += 420;
    });
    schedule(t + 150, () => setDocsPhase('done'));
  }

  function resetJourney() {
    clearStepTimers();
    pausarAuto();
    setRfcPhase('idle');
    setDocsPhase('idle');
    setDocStatuses(WAIT_4);
    setIdnPhase('idle');
    setIdnStatuses(WAIT_4);
    setConsentChecked(false);
  }

  function restart() {
    goPanel(1);
    resetJourney();
  }

  function pausarAuto() {
    autoRunningRef.current = false;
    clearTimeout(autoTimerRef.current);
    setAutoRunning(false);
  }

  const AUTO_SEQ: Array<{ run: () => void; wait: number }> = [
    { run: () => goPanel(1), wait: 2200 },
    { run: () => goPanel(2), wait: 1800 },
    { run: () => setConsentChecked(true), wait: 1400 },
    { run: () => goPanel(3), wait: 2000 },
    { run: () => validarRFC(), wait: 2600 },
    { run: () => goPanel(6), wait: 2600 },
    { run: () => goPanel(9), wait: 2000 },
    { run: () => identidad(), wait: 7600 },
    { run: () => goPanel(7), wait: 2200 },
    { run: () => cargarDocs(), wait: 7000 },
    { run: () => goPanel(10), wait: 3200 },
    { run: () => goPanel(13), wait: 2600 },
    { run: () => goPanel(14), wait: 0 },
  ];

  function tickAuto() {
    if (!autoRunningRef.current || autoIdxRef.current >= AUTO_SEQ.length) {
      autoRunningRef.current = false;
      setAutoRunning(false);
      return;
    }
    const step = AUTO_SEQ[autoIdxRef.current];
    step.run();
    autoIdxRef.current += 1;
    if (autoIdxRef.current < AUTO_SEQ.length) {
      autoTimerRef.current = setTimeout(tickAuto, step.wait);
    } else {
      autoRunningRef.current = false;
      setAutoRunning(false);
    }
  }

  function toggleAuto() {
    if (autoRunningRef.current) {
      pausarAuto();
      return;
    }
    if (autoIdxRef.current >= AUTO_SEQ.length) autoIdxRef.current = 0;
    autoRunningRef.current = true;
    setAutoRunning(true);
    tickAuto();
  }

  useEffect(() => {
    const el = pbodyRefs.current[panel];
    if (el) el.scrollTop = 0;
  }, [panel]);

  useEffect(() => {
    if (docsPhase === 'done') {
      const el = pbodyRefs.current[7];
      el?.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [docsPhase]);

  useEffect(() => {
    if (idnPhase === 'done') {
      const el = pbodyRefs.current[12];
      el?.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [idnPhase]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowDocExample(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(
    () => () => {
      clearStepTimers();
      clearTimeout(autoTimerRef.current);
    },
    [],
  );

  const pview = (n: number) => (panel === n ? 'pview on' : 'pview');
  const bodyRef = (n: number) => (el: HTMLDivElement | null) => {
    pbodyRefs.current[n] = el;
  };

  return (
    <div className="stage">
      <div className="side">
        <div className="mark" style={{ marginBottom: 26 }}>
          <span className="glyph">
            <MarkGlyph />
          </span>
          <span>
            <b>Risk Management</b>
            <span>Talent · postulación</span>
          </span>
        </div>
        <h1>Así se postula quien escanea el QR de la sucursal.</h1>
        <p>
          Desde el teléfono, en la calle, con una mano. Primero RFC, identidad y ubicación — nunca
          se le pide un documento si de todos modos no iba a pasar.
        </p>
        <div className="stepsdots" id="pdots">
          <button className={dot === 0 ? 'sdot on' : 'sdot'} onClick={() => goPanel(1)}>
            <i>1</i> {DOTS[0].label}
          </button>
          <button className={dot === 1 ? 'sdot on' : 'sdot'} onClick={() => goPanel(2)}>
            <i>2</i> {DOTS[1].label}
          </button>
          <button className={dot === 2 ? 'sdot on' : 'sdot'} onClick={() => goPanel(3)}>
            <i>3</i> {DOTS[2].label}
          </button>
          <button className={dot === 3 ? 'sdot on' : 'sdot'} onClick={() => goPanel(6)}>
            <i>4</i> {DOTS[3].label}
          </button>
          <button className={dot === 4 ? 'sdot on' : 'sdot'} onClick={() => goPanel(9)}>
            <i>5</i> {DOTS[4].label}
          </button>
          <button className={dot === 5 ? 'sdot on' : 'sdot'} onClick={identidad}>
            <i>6</i> {DOTS[5].label}
          </button>
          <button className={dot === 6 ? 'sdot on' : 'sdot'} onClick={() => goPanel(7)}>
            <i>7</i> {DOTS[6].label}
          </button>
          <button className={dot === 7 ? 'sdot on' : 'sdot'} onClick={() => goPanel(10)}>
            <i>8</i> {DOTS[7].label}
          </button>
          <button className={dot === 8 ? 'sdot on' : 'sdot'} onClick={() => goPanel(13)}>
            <i>9</i> {DOTS[8].label}
          </button>
          <button className={dot === 9 ? 'sdot on' : 'sdot'} onClick={() => goPanel(14)}>
            <i>10</i> {DOTS[9].label}
          </button>
        </div>
        <div className="flx g8" style={{ flexWrap: 'wrap' }}>
          <button className="btn ghost sm" onClick={restart}>
            Reiniciar el recorrido
          </button>
          <button className="btn sm" onClick={toggleAuto}>
            {autoRunning ? '❚❚ Pausar' : '▶ Play automático'}
          </button>
          <button
            className="btn quiet sm"
            onClick={() => navigate('/app')}
            style={{ color: 'var(--rail-ink-2)' }}
          >
            ← Volver al panel del reclutador
          </button>
        </div>
        <p className="tiny" style={{ color: 'var(--rail-ink-2)', marginTop: 18, opacity: 0.85 }}>
          En el paso 3 puedes usar «Ver ejemplo: RFC suspendido» para ver el corte automático en
          vivo: se cierra ahí, con mensaje respetuoso, sin pedirle un solo documento. En el paso 7,
          «Ver ejemplo: cuando un documento falla» muestra la corrección sin desviar el recorrido.
        </p>
      </div>

      <div className="explive" id="explive">
        <div className="explive__h">El expediente que se arma solo</div>
        {EXPLIVE_LABELS.map((label, i) => (
          <div key={i} className={explive[i] ? 'explive__item done' : 'explive__item'} data-i={i}>
            <i>
              <CheckIcon />
            </i>
            {label}
          </div>
        ))}
        <div className="explive__note">
          Nada se captura dos veces: cada dato que ya diste viaja contigo hasta el expediente
          final.
        </div>
      </div>

      <div className="phone">
        <div className="notch">
          <i />
        </div>

        {/* p1 landing */}
        <div className={pview(1)}>
          <PBar title="Banco Alcázar" subtitle="Vacante VAC-1184" />
          <div className="pbody" ref={bodyRef(1)}>
            <div className="card pad" style={{ padding: 0, overflow: 'hidden', flex: 'none' }}>
              <img
                src="/img/lona-vacante.jpg"
                alt="Lona de la vacante con QR pegada en la sucursal"
                style={{ width: '100%', display: 'block' }}
              />
              <p className="tiny dim" style={{ padding: '8px 10px 10px', textAlign: 'center' }}>
                Así se ve en la calle: la lona con el QR, pegada en la sucursal.
              </p>
            </div>
            <div>
              <h2>Cajero de Banco</h2>
              <p style={{ marginTop: 5 }}>Sucursal Centro · Turno matutino · 3 plazas</p>
            </div>
            <div className="card pad" style={{ padding: 14 }}>
              <span className="lbl">Sueldo</span>
              <p
                style={{
                  fontFamily: 'var(--f-d)',
                  fontWeight: 700,
                  fontSize: 17,
                  color: 'var(--ink)',
                  marginTop: 4,
                }}
              >
                $12,000 – $13,500
              </p>
              <p className="tiny dim" style={{ marginTop: 2 }}>
                mensuales brutos
              </p>
            </div>
            <div>
              <span className="lbl">Requisitos</span>
              <ul className="stack g8 small muted" style={{ margin: '9px 0 0', paddingLeft: 17 }}>
                {REQUISITOS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="lbl">Lo que debes saber</span>
              <ul className="stack g8 small muted" style={{ margin: '9px 0 0', paddingLeft: 17 }}>
                {LO_QUE_DEBES_SABER.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pfoot">
            <button className="btn" onClick={() => goPanel(2)}>
              Quiero postularme
            </button>
            <p className="tiny dim" style={{ textAlign: 'center' }}>
              Toma 4 minutos. No necesitas crear una cuenta.
            </p>
          </div>
        </div>

        {/* p2 aviso */}
        <div className={pview(2)}>
          <PBar title="Aviso de privacidad" subtitle="Versión 2.1 · antes de cualquier dato" />
          <Prog on={1} />
          <div className="pbody" ref={bodyRef(2)}>
            <h3>Qué vamos a hacer con tus datos</h3>
            <p>
              Banco Alcázar usará lo que nos compartas <b>únicamente</b> para evaluar tu
              postulación a esta vacante: verificar tu identidad, revisar la vigencia de tus
              documentos y consultar listas restrictivas conforme a la normativa aplicable.
            </p>
            <p>
              Tus documentos se guardan cifrados. Tu selfie se usa solo para confirmar que eres la
              persona de tu identificación y se conserva por menos tiempo que el resto del
              expediente.
            </p>
            <p>
              Puedes solicitar acceso, rectificación, cancelación u oposición en cualquier momento
              desde esta misma liga.
            </p>
            <div className="qcard" style={{ borderColor: 'var(--brand-2)' }}>
              <label className="flx g8" style={{ alignItems: 'flex-start', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  style={{ marginTop: 2, accentColor: 'var(--brand-2)' }}
                />
                <span className="small">
                  <b>Acepto el aviso de privacidad</b>
                  <br />
                  <span className="dim">Obligatorio para continuar</span>
                </span>
              </label>
              <hr className="hr" style={{ margin: '12px 0' }} />
              <label className="flx g8" style={{ alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ marginTop: 2, accentColor: 'var(--brand-2)' }} />
                <span className="small">
                  <b>Quiero que mi perfil se considere para otras vacantes compatibles</b>
                  <br />
                  <span className="dim">Opcional, y separado del anterior</span>
                </span>
              </label>
            </div>
          </div>
          <div className="pfoot">
            <button className="btn" disabled={!consentChecked} onClick={() => goPanel(3)}>
              Aceptar y continuar
            </button>
            <button className="btn quiet" style={{ width: '100%', justifyContent: 'center' }} onClick={() => goPanel(1)}>
              No acepto
            </button>
            <p className="tiny dim" style={{ textAlign: 'center' }}>
              Si no aceptas, no hay postulación y no se guarda ningún dato tuyo: ni siquiera los
              que ya hubieras escrito.
            </p>
          </div>
        </div>

        {/* p3 datos */}
        <div className={pview(3)}>
          <PBar title="Tus datos de contacto" subtitle="Paso 2 de 4" />
          <Prog on={2} />
          <div className="pbody" ref={bodyRef(3)}>
            <h3>¿Cómo te localizamos?</h3>
            <label className="field" style={{ marginTop: 2 }}>
              <span className="lbl">Nombre completo</span>
              <input defaultValue="Ana Karen Rosales Ibarra" />
            </label>
            <label className="field">
              <span className="lbl">Teléfono celular</span>
              <input defaultValue="55 2841 6690" inputMode="tel" />
            </label>
            <label className="field">
              <span className="lbl">Correo (opcional)</span>
              <input defaultValue="anakaren.rosales@gmail.com" inputMode="email" />
            </label>
            <label className="field">
              <span className="lbl">Código postal</span>
              <input defaultValue="54960" inputMode="numeric" style={{ maxWidth: 140 }} />
            </label>
            <label className="field">
              <span className="lbl">RFC</span>
              <input defaultValue="ROIA000315M23" style={{ maxWidth: 220, textTransform: 'uppercase' }} />
            </label>
            <p className="tiny dim">
              Con el código postal calculamos la distancia a la sucursal. La distancia solo suma o
              resta al Match: nunca descarta a nadie.
            </p>
            <div id="rfc-check">
              {rfcPhase !== 'idle' && (
                <div className="revcab" style={{ marginTop: 10 }}>
                  {rfcPhase === 'checking' ? (
                    <>
                      <span className="spin" />
                      <b>Validando tu RFC ante el SAT…</b>
                    </>
                  ) : (
                    <>
                      <span
                        className="st"
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          display: 'inline-grid',
                          placeItems: 'center',
                          background: 'var(--ok-soft)',
                          color: 'var(--ok)',
                          marginRight: 6,
                        }}
                      >
                        <CheckIcon />
                      </span>
                      <b>RFC activo</b>&nbsp;· sin restricciones ante el SAT
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="pfoot">
            {rfcPhase === 'ok' ? (
              <button className="btn" onClick={() => goPanel(6)}>
                Continuar
              </button>
            ) : (
              <button className="btn" disabled={rfcPhase === 'checking'} onClick={validarRFC}>
                Continuar
              </button>
            )}
            <button
              className="btn quiet sm"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => goPanel(5)}
            >
              Ver ejemplo: RFC suspendido
            </button>
          </div>
        </div>

        {/* p5 rfc suspendido (ejemplo del corte automático) */}
        <div className={pview(5)}>
          <PBar title="Postulación cerrada" subtitle="VAC-1184" bg="var(--ink-3)" />
          <div className="pbody" ref={bodyRef(5)}>
            <div className="resbig stop">
              <span className="ring">
                <XIcon />
              </span>
              <div>
                <h2>No puedes continuar</h2>
                <p style={{ marginTop: 6 }}>
                  Tu RFC aparece suspendido ante el SAT, conforme al artículo 17-H Bis.
                </p>
              </div>
            </div>
            <div className="card pad" style={{ padding: 14 }}>
              <p className="small">
                Tu perfil no puede considerarse mientras el RFC esté suspendido. Puedes volver a
                intentarlo una vez que se regularice tu situación fiscal.
              </p>
            </div>
            <div className="note">
              <b>Lo que no pasó.</b> No se te pidió ningún documento ni se tomó selfie: el proceso
              se cerró en el primer filtro, antes de cualquier gasto.
            </div>
          </div>
          <div className="pfoot">
            <button className="btn ghost" onClick={restart}>
              Ver otras vacantes
            </button>
          </div>
        </div>

        {/* p6 resultado del filtro */}
        <div className={pview(6)}>
          <PBar title="Resultado del filtro" subtitle="Primer filtro superado" />
          <div className="pbody" ref={bodyRef(6)}>
            <div className="resbig good">
              <span className="ring">
                <CheckIcon strokeWidth={2.4} linejoin={false} />
              </span>
              <div>
                <h2>Tu RFC está activo</h2>
                <p style={{ marginTop: 6 }}>
                  Antes de pedirte documentos, confirmamos que eres tú y que estás donde dices —
                  así no te hacemos subir nada si de todos modos no ibas a pasar identidad,
                  ubicación o listas.
                </p>
              </div>
            </div>
            <div className="note">
              Lo que sigue: una selfie, confirmar tu ubicación dentro de la geocerca de la
              sucursal y consultar listas restrictivas. Ahí sí, documentos.
            </div>
          </div>
          <div className="pfoot">
            <button className="btn" onClick={() => goPanel(9)}>
              Continuar
            </button>
          </div>
        </div>

        {/* p7 documentos y validación */}
        <div className={pview(7)}>
          <PBar title="Documentos y validación" subtitle="Se valida cada uno al momento" />
          <div className="pbody" ref={bodyRef(7)}>
            <h3>
              {docsPhase === 'idle' && 'Sube tus documentos'}
              {docsPhase === 'validating' && 'Validando tus documentos'}
              {docsPhase === 'done' && 'Documentación válida'}
            </h3>
            <p className="tiny dim" style={{ marginTop: -6 }}>
              Ya pasaste RFC, identidad, ubicación y listas — esto es lo único que faltaba.
            </p>
            {docsPhase === 'idle' && (
              <div className="stack g8">
                <div className="doc">
                  <span className="ic">
                    <IneIcon />
                  </span>
                  <div className="t">
                    <b>Identificación oficial (INE)</b>
                    <span>Frente y reverso</span>
                  </div>
                </div>
                <div className="doc">
                  <span className="ic">
                    <BookIcon />
                  </span>
                  <div className="t">
                    <b>Comprobante de estudios</b>
                    <span>Bachillerato</span>
                  </div>
                </div>
                <div className="doc">
                  <span className="ic">
                    <FileIcon />
                  </span>
                  <div className="t">
                    <b>Antecedentes penales</b>
                    <span>Consultado contra más de 38 listas</span>
                  </div>
                </div>
                <button
                  className="doc"
                  style={{ width: '100%', textAlign: 'left', borderStyle: 'dashed' }}
                  onClick={() => toast('Se abriría la cámara del teléfono')}
                >
                  <span className="ic">
                    <PlusIcon />
                  </span>
                  <span className="t">
                    <b>Comprobante de domicilio</b>
                    <span>Opcional · tomar foto o adjuntar</span>
                  </span>
                </button>
              </div>
            )}
            {docsPhase !== 'idle' && (
              <div className="revlist">
                {DOCS_VALID.map((d, i) => (
                  <div className="revrow" data-e={docStatuses[i]} key={d.n}>
                    <span className="st">
                      <StatusIcon estado={docStatuses[i]} />
                    </span>
                    <span className="t">
                      <b>{d.n}</b>
                      <span>
                        {docStatuses[i] === 'ok'
                          ? d.msg
                          : docStatuses[i] === 'doing'
                            ? 'Revisando vigencia, legibilidad y cruce de datos…'
                            : d.d}
                      </span>
                    </span>
                    <span>
                      {docStatuses[i] === 'ok' && (
                        <span className="pill ok">
                          <i />
                          Aprobado
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {docsPhase === 'done' && (
              <div className="note ok">
                <b>Los 4 documentos quedaron aprobados.</b> Tu expediente está completo.
              </div>
            )}
          </div>
          <div className="pfoot">
            {docsPhase === 'idle' && (
              <>
                <button className="btn" onClick={cargarDocs}>
                  Subir y validar mis documentos
                </button>
                <button className="btn quiet sm" onClick={() => setShowDocExample(true)}>
                  Ver ejemplo: cuando un documento falla
                </button>
              </>
            )}
            {docsPhase === 'validating' && (
              <p className="tiny dim" style={{ textAlign: 'center' }}>
                No cierres la pantalla, tarda unos segundos.
              </p>
            )}
            {docsPhase === 'done' && (
              <>
                <button className="btn" onClick={() => goPanel(10)}>
                  Continuar
                </button>
                <button className="btn quiet sm" onClick={() => setShowDocExample(true)}>
                  Ver ejemplo: cuando un documento falla
                </button>
              </>
            )}
          </div>
        </div>

        {/* p9 selfie */}
        <div className={pview(9)}>
          <PBar title="Confirma que eres tú" subtitle="Último paso" />
          <div className="pbody" ref={bodyRef(9)}>
            <h3>Tómate una selfie</h3>
            <p>
              La comparamos con la foto de tu INE para confirmar que eres la persona de la
              identificación. Solo guardamos el resultado, no tu rostro sin cifrar.
            </p>
            <div className="selfie">
              <span className="oval" />
              <span className="cap">Centra tu cara en el óvalo · busca buena luz</span>
            </div>
            <div className="stack g8">
              <div className="flx g8 small muted">
                <span className="pill ok">
                  <i />
                  RFC activo
                </span>{' '}
                Solo por eso llegamos a este paso
              </div>
              <p className="tiny dim">
                Si la foto no sale bien, la puedes repetir. Si después de tres intentos no se
                logra, una persona revisa tu caso: no te cerramos el proceso por eso.
              </p>
            </div>
          </div>
          <div className="pfoot">
            <button className="btn" onClick={identidad}>
              Tomar selfie
            </button>
          </div>
        </div>

        {/* p10 estado */}
        <div className={pview(10)}>
          <PBar title="Mi postulación" subtitle="VAC-1184 · Cajero de Banco" />
          <div className="pbody" ref={bodyRef(10)}>
            <div className="resbig wait">
              <span className="ring">
                <ClockIcon />
              </span>
              <div>
                <h2>Estás en revisión</h2>
                <p style={{ marginTop: 6 }}>
                  Tu expediente está completo. Reclutamiento lo está revisando.
                </p>
              </div>
            </div>
            <div className="tl">
              <div className="tlitem done">
                <span className="dt">
                  <CheckIcon strokeWidth={3} />
                </span>
                <div>
                  <b>Te postulaste</b>
                  <span>30 de agosto, 19:41</span>
                </div>
              </div>
              <div className="tlitem done">
                <span className="dt">
                  <CheckIcon strokeWidth={3} />
                </span>
                <div>
                  <b>RFC validado</b>
                  <span>30 de agosto, 19:42</span>
                </div>
              </div>
              <div className="tlitem done">
                <span className="dt">
                  <CheckIcon strokeWidth={3} />
                </span>
                <div>
                  <b>Identidad, ubicación y listas confirmadas</b>
                  <span>30 de agosto, 19:48</span>
                </div>
              </div>
              <div className="tlitem done">
                <span className="dt">
                  <CheckIcon strokeWidth={3} />
                </span>
                <div>
                  <b>Documentos aceptados</b>
                  <span>31 de agosto, 09:12</span>
                </div>
              </div>
              <div className="tlitem now">
                <span className="dt">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <div>
                  <b>En revisión de reclutamiento</b>
                  <span>Hoy</span>
                </div>
              </div>
              <div className="tlitem">
                <span className="dt" />
                <div>
                  <b>Entrevista</b>
                  <span>Te avisamos por WhatsApp</span>
                </div>
              </div>
            </div>
            <button
              className="btn ghost"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => toast('Se abriría el formulario para ejercer derechos ARCO')}
            >
              Ejercer mis derechos sobre mis datos
            </button>
          </div>
          <div className="pfoot">
            <button className="btn" onClick={() => goPanel(13)}>
              Ver actualización de mi proceso
            </button>
            <button className="btn ghost" onClick={() => navigate('/app')}>
              Ver este mismo caso desde el panel del reclutador →
            </button>
          </div>
        </div>

        {/* p13 entrevista realizada */}
        <div className={pview(13)}>
          <PBar title="Actualización de mi proceso" subtitle="VAC-1184 · Cajero de Banco" />
          <div className="pbody" ref={bodyRef(13)}>
            <div className="resbig good">
              <span className="ring">
                <CheckIcon strokeWidth={2.4} linejoin={false} />
              </span>
              <div>
                <h2>Tu entrevista ya se realizó</h2>
                <p style={{ marginTop: 6 }}>
                  Platicaste con Patricia Salazar y Mónica Herrera. Ya están definiendo la
                  decisión.
                </p>
              </div>
            </div>
            <div className="tl">
              <div className="tlitem done">
                <span className="dt">
                  <CheckIcon strokeWidth={3} />
                </span>
                <div>
                  <b>Entrevista realizada</b>
                  <span>Hoy</span>
                </div>
              </div>
              <div className="tlitem now">
                <span className="dt">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <div>
                  <b>Definiendo la decisión</b>
                  <span>Te avisamos por WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pfoot">
            <button className="btn" onClick={() => goPanel(14)}>
              Continuar
            </button>
          </div>
        </div>

        {/* p14 bienvenida */}
        <div className={pview(14)}>
          <PBar
            title="¡Bienvenido!"
            subtitle="Banco Alcázar"
            bg="var(--ok)"
            icon={<CheckIcon strokeWidth={2.4} linejoin={false} stroke="#fff" />}
          />
          <div className="pbody" ref={bodyRef(14)}>
            <div className="resbig good">
              <span className="ring">
                <CheckIcon strokeWidth={2.4} linejoin={false} />
              </span>
              <div>
                <h2>¡Bienvenido a la empresa!</h2>
                <p style={{ marginTop: 6 }}>
                  Fuiste seleccionado para Cajero de Banco en Sucursal Centro. Ingreso propuesto: 8
                  de septiembre de 2026.
                </p>
              </div>
            </div>
            <div className="note ok">
              <b>Tu expediente ya está completo.</b> Documentos, identidad y listas verificadas
              viajan contigo a tu onboarding como colaborador — no hay que capturar nada de nuevo.
            </div>
          </div>
          <div className="pfoot">
            <button
              className="btn"
              style={{ justifyContent: 'center' }}
              onClick={() =>
                toast('Se abriría el expediente digital del colaborador en el módulo de onboarding')
              }
            >
              Ir a expediente del nuevo colaborador →
            </button>
            <button className="btn ghost sm" style={{ justifyContent: 'center' }} onClick={restart}>
              Reiniciar el recorrido
            </button>
          </div>
        </div>

        {/* p12 verificación de identidad, listas y geocerca en vivo */}
        <div className={pview(12)}>
          <PBar
            title="Verificando que eres tú y dónde estás"
            subtitle="Antes de pedirte un solo documento"
            iconStroke="#06232B"
          />
          <div className="pbody" ref={bodyRef(12)}>
            <div className="revcab">
              {idnPhase === 'done' ? (
                <>
                  <span
                    className="st"
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 7,
                      display: 'grid',
                      placeItems: 'center',
                      background: 'var(--ok-soft)',
                      color: 'var(--ok)',
                    }}
                  >
                    <CheckIcon />
                  </span>
                  <b>Identidad, ubicación y listas confirmadas</b>
                </>
              ) : (
                <>
                  <span className="spin" />
                  <b>Verificando…</b>
                </>
              )}
            </div>
            <div className="stack g8">
              {PASOS_ID.map((x, i) => (
                <div className="paso-ia" data-e={idnStatuses[i]} key={x.t}>
                  <span className="st">
                    <StatusIcon estado={idnStatuses[i]} />
                  </span>
                  <span className="t">
                    <b>{x.t}</b>
                    <span>{idnStatuses[i] === 'ok' ? x.ok : x.s}</span>
                    {x.em && <em>{x.em}</em>}
                  </span>
                </div>
              ))}
            </div>
            {idnPhase === 'done' && (
              <div className="note ok">
                <b>Listo.</b> Ahora sí, tus documentos: ya sabemos que vale la pena pedírtelos.
              </div>
            )}
          </div>
          <div className="pfoot">
            {idnPhase === 'done' ? (
              <button className="btn" onClick={() => goPanel(7)}>
                Continuar a mis documentos
              </button>
            ) : (
              <p className="tiny dim" style={{ textAlign: 'center' }}>
                Tarda unos segundos.
              </p>
            )}
          </div>
        </div>
      </div>

      {showDocExample && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setShowDocExample(false)}>
          <div className="modal">
            <header>
              <h3>Ejemplo: cuando un documento falla</h3>
              <p>Así se ve para el candidato — no afecta tu recorrido actual</p>
            </header>
            <div className="cont">
              <div className="doc bad">
                <span className="ic">
                  <AlertIcon />
                </span>
                <div className="t">
                  <b>Comprobante de estudios</b>
                  <span>La imagen salió ilegible</span>
                </div>
              </div>
              <p className="small" style={{ marginTop: 10 }}>
                Necesitamos una foto legible del comprobante de bachillerato. Puedes tomarla de
                nuevo con mejor luz.
              </p>
              <div className="note warn" style={{ marginTop: 10 }}>
                <b>La postulación sigue viva.</b> Un documento observado no cierra nada: solo se
                pide rehacer ese, con 2 intentos hasta el 6 de septiembre.
              </div>
            </div>
            <footer>
              <button className="btn ghost" onClick={() => setShowDocExample(false)}>
                Entendido
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
