import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import SocialLogin from "./SocialLogin";

const Register = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();
  
  const {registerUser} = UseAuth();

  const handleRegistration = (data) => {
    console.log(data);
    registerUser(data.email, data.password)
    .then(result => {
      console.log(result.user)
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-5">
      <div className="w-full max-w-md bg-base-100 shadow-xl p-8 rounded-xl">
        
        <h1 className="text-3xl font-bold text-center mb-5">Create an Account</h1>
        
        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

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

          {/* Photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Enter your photo URL"
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
              placeholder="Create a password"
              className="input input-bordered w-full"
              required
              minLength={6}
            />
          </div>
          

          {/* Submit */}
          <button className="btn btn-primary w-full mt-3">
            Register
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </p>
        <p className="text-center my-2 font-semibold">OR</p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
