import axios from "axios";

// const BASE_URL = "http://localhost:3000/api";
const BASE_URL = "https://tara-house-backend.onrender.com/api";
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;