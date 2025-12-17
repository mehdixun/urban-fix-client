// src/hooks/UseAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom hook to access authentication context
 * Must be used inside AuthProvider
 */
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context; // user, loading, registerUser, signInUser, signInGoogle, logout
};

export default useAuth;
