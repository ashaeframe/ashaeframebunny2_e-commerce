import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchProducts = () => API.get("/products");
export const loginUser = (data) => API.post("/auth/login", data);

export default API;