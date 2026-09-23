import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiClient.post('/auth/login', { email, password });
      navigate('/app');
    } catch {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="acceso">
      <div className="wordmark">
        <h1>
          <span className="w1">RISK</span>
          <span className="w2">MANAGEMENT</span>
        </h1>
        <div className="rule" />
        <p>Talent · expediente digital de colaboradores</p>
      </div>

      <form className="tarjeta" onSubmit={onSubmit}>
        <label className="field" style={{ marginTop: 0 }}>
          <span className="lbl">Correo</span>
          <input
            type="email"
            aria-label="correo"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="lbl">Contraseña</span>
          <input
            type="password"
            aria-label="contraseña"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && (
          <p className="tiny" style={{ color: 'var(--bad)', marginTop: 10 }}>
            {error}
          </p>
        )}
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Entrando…' : 'Entrar'}
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>

      <div className="demo-note">
        <b>Demo.</b> Usa la cuenta de prueba que te compartieron para entrar directo a Talent.
      </div>
      <p className="pie">Risk Management · EGRID</p>
    </div>
  );
}
