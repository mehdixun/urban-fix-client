import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser } = UseAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await signInUser(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      Swal.fire({
        icon: "error",
        title: "Login Failed !",
        text: err.message || "Please try again!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-xl p-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <input
            type="email"
            {...register("email")}
            placeholder="Email Address"
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button className="btn btn-primary w-full mt-3">Login</button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary underline font-semibold hover:text-primary-focus">
            Register
          </Link>
        </p>

        <p className="text-center my-4 font-semibold text-gray-500">OR</p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
