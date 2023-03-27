import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const token = 'seu-token-aqui';

api.interceptors.request.use((config) => {
  if (
    config.url === '/alguma-rota-sem-autenticacao'
    || config.url === '/outra-rota-sem-autenticacao'
  ) {
    return config;
  }
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
