// src/hooks/useAxiosSecure.jsx
import axios from "axios";
import { auth } from "../firebase/firebase.init";

const useAxiosSecure = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
  });

  // Automatically attach Firebase token
  instance.interceptors.request.use(async (config) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(); // Correct Firebase ID token
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Failed to get Firebase token:", err);
    }
    return config;
  });

  // Handle global 401/403 errors
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        console.warn("Unauthorized request, check Firebase token");
      }
      return Promise.reject(err);
    }
  );

  return instance;
};

export default useAxiosSecure;
