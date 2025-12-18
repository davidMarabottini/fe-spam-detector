import axios from "axios";
import { authTokenStore } from "../auth/tokenStore";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use((config) => {
  if (config.authRequired) {
    const token = authTokenStore.get();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});


apiClient.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response?.status === 401) {
      authTokenStore.set(null);
      window.location.href = '/login';
    }
    const serverMessage = error.response?.data?.message || error.message || 'Errore di rete';
    const status = error.response?.status;
    const errorMessage = `Errore ${status || ''}: ${serverMessage}`;

    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;
