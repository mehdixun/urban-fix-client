import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";
import SocialLogin from "../pages/SocialLogin";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser } = UseAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    Swal.fire({
      title: "Logging in...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      // 1️⃣ Firebase login
      const user = await signInUser(data.email, data.password);

      try {
        // 2️⃣ Backend JWT
        const jwtRes = await axios.post("http://localhost:3000/jwt", { email: user.email });
        localStorage.setItem("token", jwtRes.data.token);
      } catch (jwtErr) {
        console.error("JWT error:", jwtErr);
        Swal.fire({
          icon: "warning",
          title: "Logged in (Firebase) but JWT failed",
          text: "You are logged in, but login token could not be retrieved.",
          timer: 2500,
          showConfirmButton: false,
        });
      }

      // 3️⃣ Success alert
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${user.displayName || user.email}`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || err.response?.data?.message || "Please try again!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-5">
      <div className="w-full max-w-md bg-base-100 shadow-xl p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-5">Welcome Back</h1>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <input type="email" {...register("email")} placeholder="Email Address" className="input input-bordered w-full" required />
          <input type="password" {...register("password")} placeholder="Password" className="input input-bordered w-full" required />
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-primary">Forgot Password?</Link>
          </div>
          <button className="btn btn-primary w-full mt-3">Login</button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account? <Link to="/register" className="text-primary underline font-semibold">Register</Link>
        </p>

        <p className="text-center my-2 font-semibold">OR</p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
