import { useSetCrumb } from '../../contexts/CrumbContext';

export function ConfiguradorVacante() {
  useSetCrumb('Configurar vacante');
  return (
    <div className="phead">
      <h1>Configurar la vacante</h1>
      <p>Pendiente de portar desde el prototipo.</p>
    </div>
  );
}
