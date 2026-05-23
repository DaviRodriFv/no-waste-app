import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.no-waste.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getWelcomeMessage() {
  try {
    const response = await api.get('/welcome');
    return response.data?.message ?? 'Bem-vindo ao No Waste App!';
  } catch (error) {
    return 'Bem-vindo ao No Waste App!';
  }
}

export async function fetchItems(path = '/items') {
  const response = await api.get(path);
  return response.data;
}

export default api;
