import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  // user = null if not logged in; else object {displayName, photoURL, premium, etc.}

  return (
    <div className="navbar bg-base-100 shadow-md px-4 py-2">
      
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-issues">All Issues</NavLink></li>
            <li><NavLink to="/about-us">About Us</NavLink></li>
            <li><NavLink to="/extra2">Extra2</NavLink></li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold text-primary">
          UrbanFix
        </Link>
      </div>

      {/* Navbar Center (Desktop menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? "text-primary font-semibold" : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/all-issues" className={({isActive}) => isActive ? "text-primary font-semibold" : ""}>All Issues</NavLink>
          </li>
          <li>
            <NavLink to="/about-us" className={({isActive}) => isActive ? "text-primary font-semibold" : ""}>About Us</NavLink>
          </li>
          <li>
            <NavLink to="/service-area" className={({isActive}) => isActive ? "text-primary font-semibold" : ""}>Service Area</NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "/default-avatar.png"} alt="profile"/>
              </div>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3">
              <li><span className="font-semibold">{user.displayName || "User"}</span></li>
              {user.premium && <li><span className="badge badge-primary">Premium</span></li>}
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li><button>Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/login" className="btn btn-primary">Login</NavLink>
            <NavLink to="/register" className="btn btn-secondary">Register</NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
