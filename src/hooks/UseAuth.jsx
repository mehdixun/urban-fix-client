// src/hooks/UseAuth.js
import { useContext } from "react";
import AuthContext from "../context/AuthContext"; // default import from AuthProvider

// Hook to access auth context
const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth must be used within an AuthProvider");
  }
  return context;
};

export default UseAuth;
