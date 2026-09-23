async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  // Varias respuestas exitosas (logout) no traen cuerpo — llamar a res.json()
  // sin condición lanza "Unexpected end of JSON input" aunque haya funcionado
  // (bug ya pisado una vez en riskmanagementv1.0, evitado desde el día uno aquí).
  if (res.status === 204) {
    if (!res.ok) throw new Error('Error de red');
    return undefined as T;
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Error de red');
  return data as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
};
