import apiClient from './apiClient';

export async function getMyBookings() {
  const res = await apiClient.get('/bookings/mine');
  return res.data;
}

export async function getAllBookings() {
  const res = await apiClient.get('/bookings');
  return res.data;
}

export async function createBooking(payload) {
  const res = await apiClient.post('/bookings', payload);
  return res.data;
}

export async function updateBooking(id, payload) {
  const res = await apiClient.put(`/bookings/${id}`, payload);
  return res.data;
}

export async function deleteBooking(id) {
  await apiClient.delete(`/bookings/${id}`);
}