// src/components/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = UseAuth();

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Successful!",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => console.log(err));
  };

  const menuItems = [
    { name: "Home", path: "/", end: true },
    { name: "All Issues", path: "/all-issues", end: true },
    ...(user ? [{ name: "Report Issue", path: "/create-issue", end: true }] : []),
    ...(user ? [{ name: "Dashboard", path: "/dashboard", end: true }] : []),
    { name: "About Us", path: "/about-us", end: true },
  ];

  const renderMenuItems = (isMobile = false) =>
    menuItems.map((item, idx) => (
      <li key={idx}>
        <NavLink
          to={item.path}
          end={item.end}
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 text-white font-semibold px-3 py-2 rounded-md"
              : isMobile
              ? "px-3 py-2 hover:bg-blue-100 rounded-md transition"
              : "px-3 py-2 hover:text-primary transition"
          }
        >
          {item.name}
        </NavLink>
      </li>
    ));

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 h-16">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo + Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Mobile Dropdown on Left */}
            <div className="lg:hidden">
              <div className="dropdown">
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
                  className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-white rounded-box w-52"
                >
                  {renderMenuItems(true)}
                </ul>
              </div>
            </div>

            {/* Logo */}
            <Link to="/" className="text-3xl font-bold text-primary">
              UrbanFix
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <ul className="flex space-x-4">{renderMenuItems()}</ul>
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full border border-gray-200">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="profile"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 mt-3"
                >
                  <li>
                    <Link
                      to="/dashboard/profile"
                      className="font-semibold text-center block"
                    >
                      {user.displayName || "User"}
                    </Link>
                  </li>
                  <li>
                    <NavLink to="/dashboard" end>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left">
                      Logout
                    </button>
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

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
