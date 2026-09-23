import { useSetCrumb } from '../../contexts/CrumbContext';

export function Tablero() {
  useSetCrumb('Tablero de candidatos');
  return (
    <div className="phead">
      <h1>Tablero de candidatos · VAC-1184</h1>
      <p>Pendiente de portar desde el prototipo.</p>
    </div>
  );
}
