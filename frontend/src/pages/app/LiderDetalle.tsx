import { useSetCrumb } from '../../contexts/CrumbContext';

export function LiderDetalle() {
  useSetCrumb('Talent · vista del líder');
  return (
    <div className="phead">
      <h1>VAC-1184</h1>
      <p>Pendiente de portar desde el prototipo.</p>
    </div>
  );
}
