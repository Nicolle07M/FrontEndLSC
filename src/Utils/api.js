import axios from "axios";

const API_URL = "http://localhost:5000/auth"; // Agregamos /auth al final


const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true
});

// Interceptor para añadir el token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ error: "Error de conexión al servidor" });
  }
);

export default api;