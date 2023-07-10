import axios from "axios";

const BASE_URL = "http://localhost:3500";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// const refreshToken = async () => {
//   return axiosInstance.get("/refresh");
// };

axiosInstance.interceptors.request.use(
  (config) => {
    let userinfo = JSON.parse(window.localStorage.getItem("user"));
    const accessToken = userinfo.accessToken;
    config.headers["x-access-token"] = accessToken;

    return config;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (err) => {
//     const originalConfig = err.config;

//     if (err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {
//           const response = await refreshToken();
//           console.log(response);
//           window.localStorage.setItem("user", JSON.stringify(response.data));
//           axiosInstance.defaults.headers.common["x-access-token"] =
//             response.data.accessToken;

//           return axiosInstance(originalConfig);
//         } catch (_error) {
//           if (_error.response && _error.response.data) {
//             return Promise.reject(_error.response.data);
//           }

//           return Promise.reject(_error);
//         }
//       }

//       if (err.response.status === 403 && err.response.data) {
//         return Promise.reject(err.response.data);
//       }
//     }

//     return Promise.reject(err);
//   }
// );

export default axiosInstance;
