import React from "react";

const StaffDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">Staff Dashboard</h2>
      <ul className="list-disc ml-6">
        <li>View assigned issues</li>
        <li>Change issue status</li>
        <li>Add progress updates</li>
        <li>Mark issues as resolved</li>
        <li>Edit profile</li>
      </ul>
    </div>
  );
};

export default StaffDashboard;
