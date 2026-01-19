import React from "react";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = UseAuth();

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const baseRoutes = [
    { name: "Home", path: "/" },
    { name: "All Issues", path: "/all-issues" },
    { name: "About Us", path: "/about-us" },
  ];

  const authRoutes = user
    ? [
        { name: "Report Issue", path: "/create-issue" },
        { name: "Dashboard", path: "/dashboard" },
      ]
    : [];

  const menuItems = [...baseRoutes, ...authRoutes];

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "bg-primary text-white px-3 py-2 rounded-md font-medium"
      : "px-3 py-2 hover:text-primary transition";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow z-50 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <div className="lg:hidden dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
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
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52"
              >
                {menuItems.map((item, i) => (
                  <li key={i}>
                    <NavLink to={item.path}>{item.name}</NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-primary">
              UrbanFix
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-2">
            {menuItems.map((item, i) => (
              <li key={i}>
                <NavLink to={item.path} className={navLinkStyle}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right: Auth / Profile */}
          <div>
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full border">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="user"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52"
                >
                  <li className="font-semibold text-center">
                    {user.displayName || "User"}
                  </li>
                  <li>
                    <NavLink to="/dashboard/profile">Profile</NavLink>
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
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
