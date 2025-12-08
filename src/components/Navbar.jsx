import React from "react";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

const Navbar = () => {
  const { user, logout } = UseAuth();

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const menuItems = [
    { name: "Home", path: "/", end: true },
    { name: "All Issues", path: "/all-issues", end: true },
    ...(user ? [{ name: "Create A Issue", path: "/create-issue", end: true }] : []),
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
              ? "bg-blue-500 text-white font-bold border-primary"
              : isMobile
              ? "hover:text-primary"
              : "hover:border-primary transition"
          }
        >
          {item.name}
        </NavLink>
      </li>
    ));

  return (
    <nav className="navbar bg-base-100 shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {renderMenuItems(true)}
          </ul>
        </div>

        <Link to="/" className="text-3xl font-bold text-primary">
          UrbanFix
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{renderMenuItems()}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "/default-avatar.png"} alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3"
            >
              <li>
                <span className="font-bold text-center">{user.displayName || "User"}</span>
              </li>
              {user.premium && (
                <li>
                  <span className="badge badge-primary">Premium</span>
                </li>
              )}
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
            <button onClick={handleLogout} className="btn btn-primary mx-5">
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
