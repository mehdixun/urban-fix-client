import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import UseAuth from '../hooks/UseAuth';

const DashBoardLayout = () => {
  const { userInfo, loading } = UseAuth();

  if (loading) return <div className="p-6">Loading...</div>;

  // Sidebar links without redirect, show basic menu even if not logged in
  const sidebarLinks = () => {
    if (!userInfo) {
      // Not logged in → limited links
      return [
        { to: '/dashboard/my-issues', label: 'My Issues' },
         { to: '/dashboard/my-payment', label: 'My Payment' },
         { to: '/dashboard/user-management', label: 'User management' },
        { to: '/dashboard/profile', label: 'Profile' },
      ];
    }

    switch (userInfo.role) {
      case 'admin':
        return [
          { to: '/dashboard/admin', label: 'Admin Dashboard' },
          { to: '/dashboard/admin/payments', label: 'Payments' },
          { to: '/dashboard/all-issues', label: 'All Issues' },
          { to: '/dashboard/manage-users', label: 'Manage Users' },
          { to: '/dashboard/manage-staff', label: 'Manage Staff' },
          { to: '/dashboard/profile', label: 'Profile' },
        ];
      case 'staff':
        return [
          { to: '/dashboard/staff', label: 'Staff Dashboard' },
          { to: '/dashboard/assigned-issues', label: 'Assigned Issues' },
          { to: '/dashboard/profile', label: 'Profile' },
        ];
      case 'citizen':
      default:
        return [
          { to: '/dashboard/my-issues', label: 'My Issues' },
          { to: '/dashboard/create-issue', label: 'Report Issue' },
          { to: '/dashboard/profile', label: 'Profile' },
        ];
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col min-h-screen bg-base-100">
        <nav className="navbar bg-base-300 shadow-md px-4 lg:px-8">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
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
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <aside className="w-64 bg-base-200 min-h-screen flex flex-col">
          <div className="p-4 text-lg font-bold border-b border-base-300">Menu</div>
          <ul className="menu p-4 flex-1 space-y-2">
            {sidebarLinks().map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition ${
                      isActive ? 'bg-indigo-500 text-white' : 'text-base-content'
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