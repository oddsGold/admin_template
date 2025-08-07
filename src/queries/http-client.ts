import { getCsrfToken } from '../utils/cookies';
import { useAuthStore } from '../store';

const baseUrl = '/api';

let isRefreshing = false;
let pendingRequests: ((token: string) => void)[] = [];

async function refreshToken(): Promise<string> {
  const { setToken, clearToken } = useAuthStore.getState();
  const csrfToken = getCsrfToken();

  try {
    const response = await fetch(`${baseUrl}/auth/refresh-tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': csrfToken || '',
      },
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Refresh failed');

    const data = await response.json();
    const newToken = data['access-token'];
    setToken(newToken);
    return newToken;
  } catch (error) {
    clearToken();
    throw error;
  }
}

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const { token } = useAuthStore.getState();
  const csrfToken = getCsrfToken();

  const headers = new Headers(init?.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (csrfToken) headers.set('X-XSRF-TOKEN', csrfToken);
  // headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  if (init?.body !== undefined && !headers.has('Content-Type')) {
    if (init.body instanceof FormData) {
      // Для FormData Content-Type буде автоматично встановлено
    } else if (init.body instanceof URLSearchParams) {
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
    } else if (typeof init.body === 'string') {
      headers.set('Content-Type', 'application/json');
    } else if (init.body !== null) {
      headers.set('Content-Type', 'application/json');
    }
  }

  let response = await fetch(`${baseUrl}${input}`, {
    ...init,
    headers,
    credentials: 'include',
  });

  if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await refreshToken();

        headers.set('Authorization', `Bearer ${newToken}`);
        response = await fetch(`${baseUrl}${input}`, { ...init, headers });

        pendingRequests.forEach((cb) => cb(newToken));
        pendingRequests = [];
      } finally {
        isRefreshing = false;
      }
    } else {
      return new Promise((resolve) => {
        pendingRequests.push((newToken: string) => {
          headers.set('Authorization', `Bearer ${newToken}`);
          resolve(fetch(`${baseUrl}${input}`, { ...init, headers }));
        });
      });
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Request failed');
  }

  return response;
}
