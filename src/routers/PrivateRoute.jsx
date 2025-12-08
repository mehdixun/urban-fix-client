import React from "react";
import { Navigate, useLocation } from "react-router";
import UseAuth from "../hooks/UseAuth";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  // show loader while auth state loading
  if (loading) {
    return <Loader />;
  }

  // if not logged in → redirect to login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} 
      />
    );
  }

  // else page allow
  return children;
};

export default PrivateRoute;
