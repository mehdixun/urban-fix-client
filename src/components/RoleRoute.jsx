import { Navigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user } = UseAuth();

  if (!user) return <Navigate to="/login" />; // not logged in
  if (!allowedRoles.includes(user.role)) return <Navigate to="/dashboard" />; // not allowed

  return children;
};

export default RoleRoute;
