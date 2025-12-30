import { BACKEND_PATH } from "@constants/api";
import axios from "axios";

const api = axios.create({
  baseURL: BACKEND_PATH,
  withCredentials: true,
});

export default api;