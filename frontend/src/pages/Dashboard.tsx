import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';

const MODULOS_V1 = [
  { nombre: 'Catálogo', detalle: 'Centros, áreas, puestos, avisos de privacidad' },
  { nombre: 'Requisición', detalle: 'Solicitudes de vacante' },
  { nombre: 'Vacante', detalle: 'Configurador de ficha, publicación, liga y QR' },
  { nombre: 'Postulación', detalle: 'Formulario público del candidato' },
  { nombre: 'Screening', detalle: 'Motor de validación (pre-filtro → documental → identidad → listas)' },
  { nombre: 'Expediente', detalle: 'Match, riesgo y evidencia por candidato' },
  { nombre: 'Decisión', detalle: 'Tablero de finalistas, entrevista, cierre' },
  { nombre: 'Bitácora', detalle: 'Auditoría encadenada' },
  { nombre: 'Notificaciones', detalle: 'Plantillas y envíos' },
  { nombre: 'Proveedores', detalle: 'Credenciales y costeo por integración' },
];

export function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get<{ email: string }>('/auth/me')
      .then((data) => setEmail(data.email))
      .catch(() => navigate('/login', { replace: true }));
  }, [navigate]);

  async function cerrarSesion() {
    await apiClient.post('/auth/logout', {});
    navigate('/login', { replace: true });
  }

  if (!email) return <p className="p-8">Cargando…</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Talent</h1>
          <p className="text-sm text-slate-500">{email}</p>
        </div>
        <button onClick={cerrarSesion} className="text-sm text-slate-500 hover:text-slate-900">Cerrar sesión</button>
      </div>
      <p className="text-sm text-slate-500">
        Primer esqueleto real, desplegado — login propio funcionando. Los módulos de abajo (del SPEC v1) todavía no están construidos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODULOS_V1.map((m) => (
          <div key={m.nombre} className="border rounded-lg p-6 opacity-60">
            <h2 className="text-lg font-semibold">{m.nombre}</h2>
            <p className="text-sm text-slate-500">{m.detalle}</p>
            <p className="text-xs text-slate-400 mt-2">Próximamente</p>
          </div>
        ))}
      </div>
    </div>
  );
}
