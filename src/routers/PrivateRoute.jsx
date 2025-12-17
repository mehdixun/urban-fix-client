import React from "react";
import { Navigate, useLocation } from "react-router";
import UseAuth from "../hooks/UseAuth";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  // 1️⃣ Show loader while auth state is loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // 2️⃣ If user not logged in, redirect to login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // 3️⃣ If logged in, render children
  return <>{children}</>;
};

export default PrivateRoute;
