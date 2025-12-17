// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase/firebase.init";
import toast, { Toaster } from "react-hot-toast";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const notify = (type, message) => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };

  const registerUser = async (email, password, name = "", photo = "") => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (name || photo) await updateProfile(res.user, { displayName: name, photoURL: photo });
      notify("success", "Registered successfully ✅");
      return res.user;
    } catch (err) {
      notify("error", err.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      notify("success", "Logged in successfully ✅");
      return res.user;
    } catch (err) {
      notify("error", err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      notify("success", "Google login successful ✅");
      return res.user;
    } catch (err) {
      notify("error", err.message || "Google login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      notify("success", "Logged out ✅");
    } catch (err) {
      notify("error", err.message || "Logout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        signInUser,
        signInWithGoogle,
        logOut,
      }}
    >
      {children}
      <Toaster position="top-right" />
    </AuthContext.Provider>
  );
};

// Hook for easier usage
export const useAuth = () => useContext(AuthContext);
export default AuthContext;
