import axios from "axios";

let baseURL = "http://localhost:3000";

if (import.meta.env.MODE === "production") {
  baseURL = "https://react-blog-json-server.glitch.me";
}

const apiProtected = axios.create({
  baseURL: baseURL,
});

apiProtected.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiProtected.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default apiProtected;
