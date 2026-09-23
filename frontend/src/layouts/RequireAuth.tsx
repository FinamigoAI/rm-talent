import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { apiClient } from '../api/client';

export function RequireAuth() {
  const [status, setStatus] = useState<'checking' | 'ok' | 'fail'>('checking');

  useEffect(() => {
    apiClient
      .get('/auth/me')
      .then(() => setStatus('ok'))
      .catch(() => setStatus('fail'));
  }, []);

  if (status === 'checking') return null;
  if (status === 'fail') return <Navigate to="/login" replace />;
  return <Outlet />;
}
