// src/services/api.js
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";
console.log('🛰️ API Base URL:', baseURL);

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true, // ✅ crucial for cookie/JWT + CORS handling
  timeout: 30000,
});

// --------------------
// 🕵️ Interceptors
// --------------------
api.interceptors.request.use(request => {
  console.log("📤 Request:", {
    method: request.method,
    url: request.url,
    data: request.data
  });
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

api.interceptors.response.use(
  response => {
    console.log("📥 Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error("❌ API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized - Redirecting to login...");
      // Optionally clear token or redirect
    }
    return Promise.reject(error);
  }
);

export default api;
