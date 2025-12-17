// src/layouts/DashBoardLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import Loader from "../components/Loader";

const DashBoardLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return null; // just in case

  // Sidebar links for all logged-in users (citizens)
  const sidebarLinks = [
    { to: "/dashboard/my-issues", label: "My Issues" },
    { to: "/dashboard/my-payment", label: "My Payment" },
    { to: "/dashboard/profile", label: "My Profile" },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col min-h-screen bg-base-100">
        <nav className="navbar bg-base-300 shadow-md px-4 lg:px-8">
          <div className="flex-none lg:hidden">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 text-center text-2xl font-bold">My Dashboard</div>
        </nav>

        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-64 bg-base-200 min-h-screen flex flex-col">
          <div className="p-4 text-lg font-bold border-b border-base-300">Menu</div>
          <ul className="menu p-4 flex-1 space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition ${
                      isActive ? "bg-indigo-500 text-white" : "text-base-content"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashBoardLayout;
