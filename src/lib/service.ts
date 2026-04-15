import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const api = axios.create({
  baseURL: 'https://brands-system-production-c110.up.railway.app',
});

api.interceptors.request.use((config) => {
  const token = getCookie('token'); 
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie('refreshToken');
        
        const { data } = await axios.post('https://brands-system-production-c110.up.railway.app/api/Auth/refresh', {
          refreshToken: refreshToken
        });

        if (data.isSuccess) {
          setCookie('token', data.token, { maxAge: 1 * 24 * 60 * 60 });
          setCookie('refreshToken', data.refreshToken, { maxAge: 7 * 24 * 60 * 60 });
          setCookie('email', data.email);
          setCookie('userType', data.userType);

          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        deleteCookie('token');
        deleteCookie('refreshToken');
        deleteCookie('email');
        deleteCookie('userType');
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;