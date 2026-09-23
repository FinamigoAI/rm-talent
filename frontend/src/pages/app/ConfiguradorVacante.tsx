import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetCrumb } from '../../contexts/CrumbContext';
import { useToast } from '../../contexts/ToastContext';

const STEPS = [
  { n: 'Paso 1', label: 'Datos generales' },
  { n: 'Paso 2', label: 'Criterios' },
  { n: 'Paso 3', label: 'Preguntas' },
  { n: 'Paso 4', label: 'Documentos y validaciones' },
  { n: 'Paso 5', label: 'Resumen y publicación' },
];

export function ConfiguradorVacante() {
  useSetCrumb('Configurar vacante');
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(1);

  return (
    <div>
      <div className="phead rowsplit">
        <div>
          <h1>Configurar la vacante</h1>
          <p>
            La ficha llega precargada del puesto. Ajustas; no armas desde cero. Lo que definas
            aquí es exactamente con lo que el motor va a filtrar.
          </p>
        </div>
        <span className="pill ne mono">SOL-2091</span>
      </div>

      <div className="steps" id="stepper">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const cls = ['step', n === step ? 'cur' : '', n < step ? 'done' : ''].filter(Boolean).join(' ');
          return (
            <button key={s.n} className={cls} onClick={() => setStep(n)}>
              <span className="n">{s.n}</span>
              <b>{s.label}</b>
            </button>
          );
        })}
      </div>

      {step === 1 && (
        <div className="cfgpane on">
          <div className="expgrid">
            <div className="sect">
              <header>
                <h4>Lo que pertenece a esta vacante, no al puesto</h4>
              </header>
              <div className="itm">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M8 3v4M16 3v4M3 11h18" />
                  </svg>
                </div>
                <div className="t">
                  <b>Vigencia de la publicación</b>
                  <span>1 al 30 de septiembre de 2026</span>
                </div>
                <span className="pill ok">
                  <i></i>Definida
                </span>
              </div>
              <div className="itm">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
                <div className="t">
                  <b>Jornada</b>
                  <span>Horario de sucursal · 9:00 a 18:00, sábados en horario reducido</span>
                </div>
              </div>
              <div className="itm">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="t">
                  <b>Rango de esta vacante</b>
                  <span>$12,000 – $13,500 · dentro del rango del catálogo</span>
                </div>
              </div>
              <div className="itm">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M4 4h16v12H4z" />
                    <path d="M8 20h8" />
                  </svg>
                </div>
                <div className="t">
                  <b>Descripción publicable</b>
                  <span>
                    Lo que verá el candidato en el anuncio, distinta de la descripción interna del
                    puesto
                  </span>
                </div>
              </div>
            </div>
            <div className="stack g16">
              <div className="note">
                <b>Sin vigencia no se publica.</b> Es lo único bloqueante de este paso.
              </div>
              <div className="sect">
                <header>
                  <h4>Heredado</h4>
                </header>
                <div className="itm">
                  <div className="t">
                    <b>3 plazas · Sucursal Centro</b>
                    <span>De la solicitud</span>
                  </div>
                </div>
                <div className="itm">
                  <div className="t">
                    <b>Cajero de Banco</b>
                    <span>Del catálogo · riesgo alto</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rowsplit" style={{ marginTop: 20 }}>
            <span></span>
            <button className="btn" onClick={() => setStep(2)}>
              Continuar a criterios →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="cfgpane on">
          <div className="expgrid">
            <div className="sect">
              <header>
                <h4>Criterios del puesto</h4>
                <span className="ruleref">obligatorio corta · no obligatorio suma al Match</span>
              </header>
              <div className="crit">
                <div className="txt">
                  <b>Bachillerato concluido (escolaridad media superior)</b>
                  <p>Verificable contra documento. Requisito mínimo del puesto.</p>
                </div>
                <div className="seg">
                  <button className="on">Obligatorio</button>
                  <button
                    onClick={() =>
                      toast(
                        'Quitarle lo obligatorio significa que ya no corta: solo bajaría el Match',
                      )
                    }
                  >
                    No obligatorio
                  </button>
                </div>
              </div>
              <div className="crit">
                <div className="txt">
                  <b>Experiencia mínima de 6 meses en manejo de efectivo</b>
                  <p>Atención a clientes o manejo de caja. Declarada y confirmada en entrevista.</p>
                </div>
                <div className="seg">
                  <button className="on">Obligatorio</button>
                  <button
                    onClick={() => toast('Quitarle lo obligatorio significa que ya no corta')}
                  >
                    No obligatorio
                  </button>
                </div>
              </div>
              <div className="crit">
                <div className="txt">
                  <b>Experiencia previa en manejo de caja bancaria</b>
                  <p>Deseable, no indispensable. Lo pidió la gerente en las notas al perfil.</p>
                </div>
                <div className="seg">
                  <button
                    onClick={() =>
                      toast(
                        'Marcarlo obligatorio cerraría a quien solo tenga experiencia en otro giro',
                      )
                    }
                  >
                    Obligatorio
                  </button>
                  <button className="on">No obligatorio</button>
                </div>
              </div>
              <div className="crit">
                <div className="txt">
                  <b>Actitud de servicio y atención a clientes</b>
                  <p>Evaluada en la dinámica de atención al público durante la entrevista.</p>
                </div>
                <div className="seg">
                  <button className="on">Obligatorio</button>
                  <button
                    onClick={() =>
                      toast('Sin actitud de servicio no hay puesto que ofrecer en ventanilla')
                    }
                  >
                    No obligatorio
                  </button>
                </div>
              </div>
              <div className="crit">
                <div className="txt">
                  <b>Domicilio a menos de 20 km de la sucursal</b>
                  <p>
                    Alimenta el Match por traslado, pero <b>no puede cortar</b>.
                  </p>
                  <span className="lock" style={{ marginTop: 7 }}>
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    La ubicación nunca produce un corte automático
                  </span>
                </div>
                <div className="seg">
                  <button disabled>Obligatorio</button>
                  <button className="on">No obligatorio</button>
                </div>
              </div>
              <div className="crit">
                <div className="txt">
                  <b>Organización y precisión</b>
                  <p>Evaluada en la dinámica de caja durante la entrevista.</p>
                </div>
                <div className="seg">
                  <button
                    onClick={() =>
                      toast('Quedaría como corte; en este puesto se dejó como Match')
                    }
                  >
                    Obligatorio
                  </button>
                  <button className="on">No obligatorio</button>
                </div>
              </div>
            </div>
            <div className="stack g16">
              <div className="note warn">
                <b>Un criterio bloqueado.</b> «Domicilio a menos de 20 km» no admite marcarse como
                obligatorio: la distancia, el traslado y la geocerca solo alimentan el Match. Es
                una regla del sistema, no una preferencia de configuración.
              </div>
              <div className="sect">
                <header>
                  <h4>Efecto de esta ficha</h4>
                </header>
                <div className="itm">
                  <div className="t">
                    <b>3 criterios que cortan</b>
                    <span>Escolaridad, experiencia en efectivo y actitud de servicio</span>
                  </div>
                  <span className="pill ba">
                    <i></i>Corta
                  </span>
                </div>
                <div className="itm">
                  <div className="t">
                    <b>3 criterios que suman al Match</b>
                    <span>Cada uno vale lo mismo: 33.3%</span>
                  </div>
                  <span className="pill ne">Match</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rowsplit" style={{ marginTop: 20 }}>
            <button className="btn ghost" onClick={() => setStep(1)}>
              ← Datos generales
            </button>
            <button className="btn" onClick={() => setStep(3)}>
              Continuar a preguntas →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="cfgpane on">
          <div className="expgrid">
            <div className="sect">
              <header>
                <h4>Preguntas del pre-filtro</h4>
                <span className="ruleref">cada respuesta se clasifica</span>
              </header>
              <div className="qa">
                <b>¿Concluiste el bachillerato?</b>
                <p className="tiny dim" style={{ marginTop: 3 }}>
                  Evalúa: Bachillerato concluido · una sola respuesta
                </p>
                <div className="ops">
                  <span className="op y">Sí, concluido · cumple</span>
                  <span className="op n">En trámite, no concluido · no cumple</span>
                  <span className="op n">No concluido · no cumple</span>
                </div>
              </div>
              <div className="qa">
                <b>¿Cuánta experiencia tienes en manejo de efectivo o atención a clientes?</b>
                <p className="tiny dim" style={{ marginTop: 3 }}>
                  Evalúa: Experiencia mínima de 6 meses · escala ordenada
                </p>
                <div className="ops">
                  <span className="op y">Más de 1 año · cumple</span>
                  <span className="op y">Entre 6 meses y 1 año · cumple</span>
                  <span className="op n">Menos de 6 meses · no cumple</span>
                  <span className="op n">Sin experiencia · no cumple</span>
                </div>
              </div>
              <div className="qa">
                <b>¿Has manejado caja o POS bancario antes?</b>
                <p className="tiny dim" style={{ marginTop: 3 }}>
                  Evalúa: Experiencia en caja bancaria · varias respuestas · basta una
                </p>
                <div className="ops">
                  <span className="op y">Sí, en banco · cumple</span>
                  <span className="op y">Sí, en otro giro (retail o restaurante) · cumple</span>
                  <span className="op n">No, sería mi primera vez · no cumple</span>
                </div>
              </div>
              <div className="qa">
                <b>¿Cómo describirías tu trato con el público?</b>
                <p className="tiny dim" style={{ marginTop: 3 }}>
                  Evalúa: Actitud de servicio · una sola respuesta
                </p>
                <div className="ops">
                  <span className="op y">Paciente y resolutivo · cumple</span>
                  <span className="op n">Prefiero no tratar con público · no cumple</span>
                  <span className="op n">Depende del día · no cumple</span>
                </div>
              </div>
            </div>
            <div className="stack g16">
              <div className="note ok">
                <b>Ficha consistente.</b> Cada pregunta tiene al menos una respuesta que cumple y
                una que no, y la escala de experiencia no tiene huecos.
              </div>
              <div className="note">
                <b>Por qué importa.</b> Si todas las respuestas cumplieran, la pregunta no
                distinguiría nada y la ficha no se podría publicar.
              </div>
            </div>
          </div>
          <div className="rowsplit" style={{ marginTop: 20 }}>
            <button className="btn ghost" onClick={() => setStep(2)}>
              ← Criterios
            </button>
            <button className="btn" onClick={() => setStep(4)}>
              Continuar a documentos →
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="cfgpane on">
          <div className="expgrid">
            <div className="stack g20">
              <div className="sect">
                <header>
                  <h4>Documentos que se pedirán</h4>
                  <span className="ruleref">solo a quien pase el corte</span>
                </header>
                <div className="itm">
                  <div className="t">
                    <b>Identificación oficial (INE)</b>
                    <span>Respaldada por: validación de identidad</span>
                  </div>
                  <span className="pill ba">
                    <i></i>Obligatorio
                  </span>
                </div>
                <div className="itm">
                  <div className="t">
                    <b>Comprobante de estudios (bachillerato)</b>
                    <span>Respaldado por: criterio obligatorio de escolaridad</span>
                  </div>
                  <span className="pill ba">
                    <i></i>Obligatorio
                  </span>
                </div>
                <div className="itm">
                  <div className="t">
                    <b>Antecedentes penales</b>
                    <span>Respaldado por: verificación de seguridad · más de 38 listas</span>
                  </div>
                  <span className="pill ba">
                    <i></i>Obligatorio
                  </span>
                </div>
                <div className="itm">
                  <div className="t">
                    <b>Comprobante de domicilio</b>
                    <span>Alimenta Match y verificación de domicilio</span>
                  </div>
                  <span className="pill ne">Opcional</span>
                </div>
                <div className="itm">
                  <div className="t">
                    <b>Certificado de secundaria</b>
                    <span>Criterio no obligatorio</span>
                  </div>
                  <span className="pill ne">Opcional</span>
                </div>
              </div>
              <div className="sect">
                <header>
                  <h4>Validaciones</h4>
                  <span className="ruleref">corta solo en identidad y listas</span>
                </header>
                <div className="itm">
                  <div className="t">
                    <b>Revisión documental</b>
                    <span>Cruce de datos, vigencia, legibilidad y señales de alteración</span>
                  </div>
                  <div className="seg">
                    <button disabled>Corta</button>
                    <button className="on">Solo marca</button>
                  </div>
                </div>
                <div className="itm">
                  <div className="t">
                    <b>Identidad y prueba de vida</b>
                    <span>$18.00 por candidato · mínimo obligatorio por riesgo alto</span>
                  </div>
                  <div className="seg">
                    <button className="on">Corta</button>
                    <button disabled>Solo marca</button>
                  </div>
                </div>
                <div className="itm">
                  <div className="t">
                    <b>Listas restrictivas y PEP</b>
                    <span>$9.50 por candidato · mínimo obligatorio por riesgo alto</span>
                  </div>
                  <div className="seg">
                    <button className="on">Corta</button>
                    <button disabled>Solo marca</button>
                  </div>
                </div>
                <div className="itm">
                  <div className="t">
                    <b>Antecedentes</b>
                    <span>$42.00 por candidato · mínimo obligatorio por riesgo alto</span>
                  </div>
                  <div className="seg">
                    <button disabled>Corta</button>
                    <button className="on">Solo marca</button>
                  </div>
                </div>
                <div className="itm">
                  <div className="t">
                    <b>Referencias laborales</b>
                    <span>$26.00 por candidato</span>
                  </div>
                  <div className="seg">
                    <button disabled>Corta</button>
                    <button className="on">Solo marca</button>
                  </div>
                </div>
                <div className="itm">
                  <div className="t">
                    <b>Verificación de domicilio</b>
                    <span>$14.00 por candidato</span>
                  </div>
                  <div className="seg">
                    <button disabled>Corta</button>
                    <button className="on">Solo marca</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="stack g16">
              <div className="kpi ia">
                <div className="v">$109.50</div>
                <div className="k">Costo estimado por candidato que llegue a validación completa</div>
              </div>
              <div className="note warn">
                <b>Tres validaciones no se pueden desactivar.</b> El nivel de riesgo alto del
                puesto obliga identidad, listas y antecedentes en toda vacante de este puesto.
              </div>
              <div className="note">
                <b>«Corta» está deshabilitado</b> en documental, antecedentes, referencias y
                domicilio: esas nunca cierran a nadie, solo levantan bandera ámbar para que tú
                preguntes.
              </div>
            </div>
          </div>
          <div className="rowsplit" style={{ marginTop: 20 }}>
            <button className="btn ghost" onClick={() => setStep(3)}>
              ← Preguntas
            </button>
            <button className="btn" onClick={() => setStep(5)}>
              Continuar al resumen →
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="cfgpane on">
          <div className="expgrid">
            <div className="sect">
              <header>
                <h4>Lo que verá el candidato</h4>
                <span className="ruleref">vista previa</span>
              </header>
              <div className="pad stack g14">
                <div>
                  <h3 style={{ fontSize: 18 }}>Cajero de Banco</h3>
                  <p className="small muted">Banco Alcázar · Sucursal Centro · Turno matutino</p>
                </div>
                <hr className="hr" />
                <div>
                  <span className="lbl">Requisitos</span>
                  <ul
                    className="stack g8 small muted"
                    style={{ margin: '8px 0 0', paddingLeft: 18 }}
                  >
                    <li>Escolaridad media superior (bachillerato concluido)</li>
                    <li>Experiencia mínima de 6 meses en manejo de efectivo o atención a clientes</li>
                    <li>Disponibilidad de horario de sucursal, incluyendo sábados</li>
                    <li>Deseable: experiencia previa en manejo de caja bancaria</li>
                  </ul>
                </div>
                <div>
                  <span className="lbl">Lo que debes saber antes de postularte</span>
                  <ul
                    className="stack g8 small muted"
                    style={{ margin: '8px 0 0', paddingLeft: 18 }}
                  >
                    <li>El puesto exige examen médico de aptitud al momento de la contratación</li>
                    <li>La sucursal abre sábados en horario reducido</li>
                  </ul>
                </div>
                <div>
                  <span className="lbl">Sueldo</span>
                  <p className="small muted" style={{ marginTop: 6 }}>
                    $12,000 – $13,500 mensuales brutos
                  </p>
                </div>
              </div>
            </div>
            <div className="stack g16">
              <div className="sect">
                <header>
                  <h4>Revisión de la ficha</h4>
                </header>
                {[
                  '3 criterios obligatorios con su pregunta',
                  'Todas las respuestas clasificadas',
                  'Documentos definidos y respaldados',
                  'Mínimo de validaciones por riesgo alto',
                  'Vigencia de publicación',
                ].map((texto) => (
                  <div className="itm" key={texto}>
                    <div
                      className="ico"
                      style={{ background: 'var(--ok-soft)', borderColor: 'transparent', color: 'var(--ok)' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div className="t">
                      <b>{texto}</b>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn"
                style={{ justifyContent: 'center', padding: 12 }}
                onClick={() => {
                  navigate('/app/pub');
                  toast('VAC-1184 publicada · ficha congelada');
                }}
              >
                Publicar la vacante
              </button>
              <div className="note">
                <b>Al publicar, la ficha se congela.</b> Toda evaluación de esta vacante corre
                contra esta versión exacta, aunque después alguien edite el puesto en el catálogo.
                Es lo que permite reconstruir un año después con qué reglas se evaluó a alguien.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
