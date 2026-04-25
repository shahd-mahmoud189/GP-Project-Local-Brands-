import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const api = axios.create({
  baseURL: "https://brands-system-production-c110.up.railway.app",
});

// 1. طلبات الـ Request: إضافة التوكن للهيدر تلقائياً
api.interceptors.request.use((config) => {
  const token = getCookie("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. استجابة الـ Response: التعامل مع انتهاء التوكن (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // التحقق من حالة 401 (غير مصرح) ومنع التكرار اللانهائي
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie("refreshToken");
        const token = getCookie("token");

        // تعديل الـ Body ليطابق ما يطلبه السيرفر (PascalCase)
        const { data } = await axios.post(
          "https://brands-system-production-c110.up.railway.app/api/Auth/refresh",
          {
            Token: token,             // الحرف الأول كابيتال
            RefreshToken: refreshToken,   // الحرف الأول كابيتال
          }
        );

        if (data.isSuccess) {
          // تحديث الكوكيز بالتوكنات الجديدة
          setCookie("token", data.token, { maxAge: 1 * 24 * 60 * 60 });
          setCookie("refreshToken", data.refreshToken, {
            maxAge: 7 * 24 * 60 * 60,
          });
          setCookie("email", data.email);
          setCookie("userType", data.userType);

          // إعادة إرسال الريكويست الأصلي بالتوكن الجديد
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return api(originalRequest);
        }
      } catch (refreshError: any) {
        console.log("Refresh Failed Details:", refreshError.response?.data);
        
        // في حالة فشل الريفريش (التوكن انتهى تماماً)، مسح البيانات والتحويل للوجن
        deleteCookie("token");
        deleteCookie("refreshToken");
        deleteCookie("email");
        deleteCookie("userType");

        if (typeof window !== "undefined") {
          //  window.location.href = '/auth/login'; // فكي الكومنت هنا لما تحبي يفعل الـ redirect
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;