import React from "react";
import { Link } from "react-router-dom";

const CitizenDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">Citizen Dashboard</h2>
      <ul className="list-disc ml-6">
        <li><Link to="/create-issue" className="text-blue-600">Submit issues</Link></li>
        <li>Edit/Delete own issues (if pending)</li>
        <li>Boost priority</li>
        <li>Access premium subscription</li>
        <li>Track activities</li>
      </ul>
    </div>
  );
};

export default CitizenDashboard;
