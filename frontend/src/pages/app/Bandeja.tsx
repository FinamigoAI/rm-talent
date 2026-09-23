import { useSetCrumb } from '../../contexts/CrumbContext';

export function Bandeja() {
  useSetCrumb('Solicitudes');
  return (
    <div className="phead">
      <h1>Solicitudes de vacante</h1>
      <p>Pendiente de portar desde el prototipo.</p>
    </div>
  );
}
