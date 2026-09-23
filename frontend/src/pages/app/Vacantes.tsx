import { useSetCrumb } from '../../contexts/CrumbContext';

export function Vacantes() {
  useSetCrumb('Vacantes');
  return (
    <div className="phead">
      <h1>Mis vacantes</h1>
      <p>Pendiente de portar desde el prototipo.</p>
    </div>
  );
}
