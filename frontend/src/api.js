import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL+"/api" });

API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) config.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  return config;
});

export const loginUser = (data) => API.post("/users/login", data);
export const registerUser = (data) => API.post("/users/register", data);
// export const fetchContactMessages = () => API.get("/contact");