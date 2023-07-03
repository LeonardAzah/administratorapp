import axios from "axios";
const BASE_URL = "http://localhost:3500";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
axiosInstance.interceptors.request.use(
  (config) => {
    let userinfo = JSON.parse(window.localStorage.getItem("user"));
    const accessToken = userinfo.accessToken;
    config.headers["x-access-token"] = accessToken;

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
