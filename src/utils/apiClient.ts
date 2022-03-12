import axios from "axios";
import { BASE_URL } from "./constant";

const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.defaults.withCredentials = true;

// Request Log
api.interceptors.request.use((request) => {
  console.log(`axios request: ${request.method} | ${request.url}`);
  return request;
});

export default api;
