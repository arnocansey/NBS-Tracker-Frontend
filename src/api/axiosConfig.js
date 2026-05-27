import axios from 'axios';

const rawApi = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const API_BASE_URL = /\/api\/v1\/?$/.test(rawApi)
  ? rawApi.replace(/\/$/, '')
  : `${rawApi.replace(/\/$/, '')}/api/v1`;

export const API_HOST = API_BASE_URL.replace(/\/api\/v1$/, '');

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

export const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const setSessionExpiredHandler = (handler) => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && typeof handler === 'function') {
        handler();
      }
      return Promise.reject(error);
    }
  );
};

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
