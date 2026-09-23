import { useSetCrumb } from '../../contexts/CrumbContext';

export function BaseTalento() {
  useSetCrumb('Base de talento');
  return (
    <div className="phead">
      <h1>Descartados y base de talento</h1>
      <p>Pendiente de portar desde el prototipo.</p>
    </div>
  );
}
