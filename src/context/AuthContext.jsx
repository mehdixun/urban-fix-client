import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);          // Authenticated user (firebase/local)
  const [dbUser, setDbUser] = useState(null);      // user from database (role, premium, blocked)
  const [loading, setLoading] = useState(true);

  // 🔥 Fake login listener (replace with Firebase auth if needed)
  const fakeAuth = async () => {
    const demoUser = {
      name: "Demo User",
      email: "demo@gmail.com",
    };
    return demoUser;
  };

  // 🟢 Load auth + DB user
  useEffect(() => {
    const loadUser = async () => {
      const loggedUser = await fakeAuth(); 
      setUser(loggedUser);

      if (loggedUser?.email) {
        try {
          const res = await axios.get(
            `http://localhost:3000/users/${loggedUser.email}`
          );
          setDbUser(res.data); // load user from DB
        } catch (e) {
          console.log("DB user fetch error:", e);
        }
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  // 🛑 Logout simple
  const logOut = () => {
    setUser(null);
    setDbUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,        // firebase/local user
        dbUser,      // mongoDB user => {role, premium, blocked}
        loading,
        setDbUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
