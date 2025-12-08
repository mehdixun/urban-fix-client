import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">Admin Dashboard</h2>
      <ul className="list-disc ml-6">
        <li><Link to="/dashboard/my-issues" className="text-blue-600">View all issues</Link></li>
        <li>Assign staff</li>
        <li>Reject issues</li>
        <li>Manage staff</li>
        <li>Manage citizens</li>
        <li>View payments</li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
