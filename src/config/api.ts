import axios from "axios";
import { apiBaseURL } from "./baseURL";
export const api = axios.create ({
    baseURL: apiBaseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    }
})

// ✅ Add interceptor to always attach the latest token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);