import { useSetCrumb } from '../../contexts/CrumbContext';

export function SeleccionCierre() {
  useSetCrumb('Selección y cierre');
  return (
    <div className="phead">
      <h1>Selección y cierre · VAC-1184</h1>
      <p>Pendiente de portar desde el prototipo.</p>
    </div>
  );
}
