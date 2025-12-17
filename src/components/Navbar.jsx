import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout, loading } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // fetch backend user (only role / premium)
  useEffect(() => {
    if (!user?.email) return setDbUser(null);
    axiosSecure
      .get(`/users/${user.email}`)
      .then((res) => setDbUser(res.data))
      .catch(() => setDbUser(null));
  }, [user, axiosSecure]);

  const handleLogout = async () => {
    await logout();
    Swal.fire({
      icon: "success",
      title: "Logged out!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  if (loading) {
    return (
      <div className="h-16 flex items-center justify-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "All Issues", path: "/all-issues" },
    ...(user ? [{ name: "Report Issue", path: "/create-issue" }] : []),
    ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
    { name: "About Us", path: "/about-us" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          UrbanFix
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "hover:text-blue-500 transition-colors duration-200"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Avatar / Login */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full border flex items-center justify-center bg-gray-100 overflow-hidden">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-gray-500" />
                  )}
                </div>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
              >
                <li className="text-center font-semibold">
                  {user.displayName || user.email}
                </li>

                {dbUser?.premium && (
                  <li className="flex justify-center">
                    <span className="badge badge-primary">Premium</span>
                  </li>
                )}

                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden btn btn-square btn-ghost"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="md:hidden bg-white shadow-md py-2 px-4 flex flex-col gap-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-500"
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
