import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (config && !config._retry) {
      config._retry = true;
      return API(config);
    }

    return Promise.reject(error);
  }
);

export const fetchProducts = () => API.get("/products");
export const loginUser = (data) => API.post("/auth/login", data);

export default API;