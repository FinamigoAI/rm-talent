import { useSetCrumb } from '../../contexts/CrumbContext';

export function GuiaEntrevista() {
  useSetCrumb('Guía de entrevista');
  return (
    <div className="phead">
      <h1>Guía de entrevista</h1>
      <p>Pendiente de portar desde el prototipo.</p>
    </div>
  );
}
