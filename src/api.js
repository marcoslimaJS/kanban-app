import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (
    config.url === '/login'
    || config.url === '/register'
  ) {
    return config;
  }
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer  ${token}`;
  return config;
});

export default api;
