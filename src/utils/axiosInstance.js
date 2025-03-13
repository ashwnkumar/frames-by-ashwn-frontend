import axios from "axios";

// Base instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor: Attach Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Unauthorized Errors
axiosInstance.interceptors.response.use(
  (response) => response, // Forward successful response
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken"); // Remove expired token
      window.location.href = "/admin/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
