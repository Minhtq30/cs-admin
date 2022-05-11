import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_OIDC_ISSUER || 'https://auth.ghtklab.com',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const accessTokenObj = JSON.parse(localStorage.getItem('ghtk-token-storage') || '{}');
    const accessToken =
      Object.keys(accessTokenObj).length > 0 ? accessTokenObj?.accessToken?.accessToken : null;
    if (!config.headers) {
      return config;
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Only handle when status == 401
    if (error?.response.status !== 401) {
      return Promise.reject(error);
    }
  }
);

export default api;
