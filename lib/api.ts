import axios from 'axios';
import type { ApiError } from '@/types/residuos';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
  withCredentials: true,
});

export function isApiError(err: unknown): err is { response: { data: ApiError } } {
  return axios.isAxiosError(err) && !!err.response?.data?.message;
}
