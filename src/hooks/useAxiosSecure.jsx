// src/hooks/useAxiosSecure.jsx
import axios from "axios";

const useAxiosSecure = () => {
  // Simple axios instance without Firebase token
  const instance = axios.create({
    baseURL: "https://urban-fix-server.vercel.app",
    // Optional: timeout, headers etc.
  });

  // Optional: response interceptor for logging errors
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      console.error("Axios request failed:", err);
      return Promise.reject(err);
    }
  );

  return instance;
};

export default useAxiosSecure;
