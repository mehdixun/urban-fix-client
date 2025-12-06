import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {signInUser} = UseAuth();

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
    .then(result => {
      console.log(result.user)
    })
    .catch(error => {
      console.log(error)
    })
  }
  return (
    <div onSubmit={handleSubmit(handleLogin)} className="min-h-screen flex items-center justify-center bg-base-200 px-5">
      <div className="w-full max-w-md bg-base-100 shadow-xl p-8 rounded-xl">
        
        <h1 className="text-3xl font-bold text-center mb-5">Welcome Back</h1>

        <form className="space-y-4">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              {...register('password')}
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Forget Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button className="btn btn-primary w-full mt-3">
            Login
          </button>
        </form>

        {/* No account */}
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary underline font-semibold hover:underline">
            Register
          </Link>
        </p>
        <p className="text-center my-2 font-semibold">OR</p>
        <SocialLogin></SocialLogin>
      </div>
      
    </div>
  );
};

export default Login;
