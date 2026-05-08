import axios from "axios";

export const http = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
});
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401)
      return (
        alert("您的登录已过期,请重新登录"),
        (window.location.href = "/login")
      );
  },
);
