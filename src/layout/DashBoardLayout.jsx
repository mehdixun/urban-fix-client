import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col min-h-screen bg-base-100">
        {/* Navbar */}
        <nav className="navbar bg-base-300 shadow-md px-4 lg:px-8">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
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
          <div className="flex-1 px-2 text-xl font-semibold">My Dashboard</div>
        </nav>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <aside className="w-64 bg-base-200 min-h-screen flex flex-col">
          <div className="p-4 text-lg font-bold border-b border-base-300">Menu</div>
          <ul className="menu p-4 flex-1 space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition ${
                    isActive ? 'bg-indigo-500 text-white' : 'text-base-content'
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
                </svg>
                Homepage
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-issues"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition ${
                    isActive ? 'bg-indigo-500 text-white' : 'text-base-content'
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                My Issues
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition ${
                    isActive ? 'bg-indigo-500 text-white' : 'text-base-content'
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Settings
              </NavLink>
            </li>
          </ul>

          <div className="p-4 border-t border-base-300">
            <button className="btn w-full btn-outline btn-primary">Logout</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashBoardLayout;
