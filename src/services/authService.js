import apiClient from './apiClient';

export async function login(email, password) {
  const res = await apiClient.post('/auth/login', { email, password });
  // expected: { token, user: { id, email, role } }
  return res.data;
}

export async function register(email, password) {
  const res = await apiClient.post('/auth/register', { email, password });
  return res.data; // can be { message } or { token, user } depending on backend
}