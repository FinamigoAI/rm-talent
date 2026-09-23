import { useSetCrumb } from '../../contexts/CrumbContext';

export function Expediente() {
  useSetCrumb('Expediente');
  return (
    <div className="phead">
      <h1>Expediente del candidato</h1>
      <p>Pendiente de portar desde el prototipo.</p>
    </div>
  );
}
