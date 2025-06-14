import axios from "axios";

let baseURL = "http://localhost:3000";

// if production
if (import.meta.env.MODE === "production") {
  baseURL = "https://react-blog-json-server.glitch.me";
}

const api = axios.create({
  baseURL: baseURL,
});

export default api;
