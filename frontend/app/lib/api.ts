// lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${BASE}/login`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
  if (!res.ok) { const data = await res.json().catch(() => ({})); throw new Error(data.message || 'Login failed'); }
  return await res.json();
}

export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch(`${BASE}/register`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
  if (!res.ok) { const data = await res.json().catch(() => ({})); throw new Error(data.message || 'Registration failed'); }
  return await res.json();
}

export async function forgotPassword(email: string) {
  const res = await fetch(`${BASE}/forgot-password`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
  if (!res.ok) { const data = await res.json().catch(() => ({})); throw new Error(data.message || 'Reset link failed'); }
  return await res.json();
}

export async function resetPassword(token: string, newPassword: string) {
  const res = await fetch(`${BASE}/reset-password/${token}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ newPassword }) });
  if (!res.ok) { const data = await res.json().catch(() => ({})); throw new Error(data.message || 'Reset failed'); }
  return await res.json();
}

export async function checkAuth() {
  const res = await fetch(`${BASE}/checkAuth`, { method: 'GET', credentials: 'include' });
  if (!res.ok) { throw new Error('Not authenticated'); }
  return await res.json();
}
