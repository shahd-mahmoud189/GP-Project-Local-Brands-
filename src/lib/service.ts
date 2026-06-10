import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const api = axios.create({
  baseURL: "https://brands-system-production-c110.up.railway.app",
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use(async (config) => {
  let token;

  if (typeof window !== "undefined") {
    
    token = getCookie("token");
  } 
  else {
    try {
      const { cookies } = await import("next/headers");
      
      const cookieStore = await cookies(); 
      token = cookieStore.get("token")?.value;
    } catch (err) {
      console.log("Not in a server environment");
    }
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getCookie("refreshToken");
      const token = getCookie("token");

      if (!refreshToken || !token) {
        isRefreshing = false;
        deleteCookie("token");
        deleteCookie("refreshToken");
        deleteCookie("email");
        deleteCookie("userType");
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(error);
      }

      try {
        // بيكلم السيرفر الخارجي مباشرة
        const { data } = await axios.post(
          "https://graduationprojectclean-production.up.railway.app/api/Auth/refresh-token",
          { refreshToken: refreshToken }
        );

        if (data.isSuccess) {
          // بيحدث الكوكيز في المتصفح مباشرة
          setCookie("token", data.token, { maxAge: 1 * 24 * 60 * 60 });
          setCookie("refreshToken", data.refreshToken, { maxAge: 7 * 24 * 60 * 60 });
          setCookie("email", data.email);
          setCookie("userType", data.userType);

          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          processQueue(null, data.token);
          return api(originalRequest);
        } else {
          throw new Error("Refresh failed");
        }
      } catch (refreshError: any) {
        processQueue(refreshError, null);
        deleteCookie("token");
        deleteCookie("refreshToken");
        deleteCookie("email");
        deleteCookie("userType");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;