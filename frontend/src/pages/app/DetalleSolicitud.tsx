import { useSetCrumb } from '../../contexts/CrumbContext';

export function DetalleSolicitud() {
  useSetCrumb('SOL-2091');
  return (
    <div className="phead">
      <h1>SOL-2091 · Cajero de Banco</h1>
      <p>Pendiente de portar desde el prototipo.</p>
    </div>
  );
}
