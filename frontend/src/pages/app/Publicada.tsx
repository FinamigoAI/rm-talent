import { useSetCrumb } from '../../contexts/CrumbContext';

export function Publicada() {
  useSetCrumb('VAC-1184 publicada');
  return (
    <div className="phead">
      <h1>VAC-1184 publicada</h1>
      <p>Pendiente de portar desde el prototipo.</p>
    </div>
  );
}
