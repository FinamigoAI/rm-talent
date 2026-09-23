import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await apiClient.post('/auth/login', { email, password });
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-24 space-y-4">
      <h1 className="text-xl font-semibold">Talent</h1>
      <label className="block">Correo
        <input aria-label="correo" value={email} onChange={(e) => setEmail(e.target.value)} className="border w-full p-2 rounded" />
      </label>
      <label className="block">Contraseña
        <input aria-label="contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border w-full p-2 rounded" />
      </label>
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded w-full">Entrar</button>
    </form>
  );
}
