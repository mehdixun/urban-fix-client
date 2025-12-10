import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";
import SocialLogin from "../pages/SocialLogin";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { registerUser } = UseAuth(); // Firebase registration
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    Swal.fire({
      title: "Creating your account...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      // Firebase register
      const user = await registerUser(data.email, data.password, data.name, data.photo);

      try {
        // Backend JWT (optional, wrap in try/catch)
        const jwtRes = await axios.post("http://localhost:3000/jwt", { email: user.email });
        localStorage.setItem("token", jwtRes.data.token);
      } catch (jwtErr) {
        console.error("JWT error:", jwtErr);
        // Optionally notify user
        Swal.fire({
          icon: "warning",
          title: "Registered (Firebase) but JWT failed",
          text: "You are registered, but login token could not be retrieved.",
          timer: 2500,
          showConfirmButton: false,
        });
      }

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: `Welcome, ${user.displayName || user.email}`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || err.response?.data?.message || "Please try again!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-5">
      <div className="w-full max-w-md bg-base-100 shadow-xl p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-5">Create an Account</h1>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          <input type="text" {...register("name")} placeholder="Full Name" className="input input-bordered w-full" required />
          <input type="email" {...register("email")} placeholder="Email Address" className="input input-bordered w-full" required />
          <input type="text" {...register("photo")} placeholder="Photo URL" className="input input-bordered w-full" />
          <input type="password" {...register("password")} placeholder="Password" className="input input-bordered w-full" required minLength={6} />
          <button className="btn btn-primary w-full mt-3">Register</button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-primary font-semibold">Login</Link>
        </p>

        <p className="text-center my-2 font-semibold">OR</p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
