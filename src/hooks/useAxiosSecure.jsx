// src/hooks/useAxiosSecure.js
import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          // invalidate session
          try { await logOut(); } catch(e){/* ignore */ }
          localStorage.removeItem("token");
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => axiosSecure.interceptors.response.eject(resInterceptor);
  }, [user, logOut, navigate]);

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axiosSecure.interceptors.request.eject(reqInterceptor);
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
