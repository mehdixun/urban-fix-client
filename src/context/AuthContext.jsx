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
import { app } from "../firebase/firebase.init"; // make sure this exports app
import toast, { Toaster } from "react-hot-toast";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const registerUser = async (email, password, name, photo) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (name || photo) {
        await updateProfile(res.user, { displayName: name || "", photoURL: photo || "" });
      }
      toast.success("Registered (Firebase) ✅");
      return res.user;
    } catch (err) {
      toast.error(err.message || "Register failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in (Firebase) ✅");
      return res.user;
    } catch (err) {
      toast.error(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      toast.success("Google login ✅");
      return res.user;
    } catch (err) {
      toast.error(err.message || "Google login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast.success("Logged out ✅");
      localStorage.removeItem("token"); // important
    } catch (err) {
      toast.error(err.message || "Logout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, registerUser, signInUser, signInWithGoogle, logOut }}>
      {children}
      <Toaster position="top-right" />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
