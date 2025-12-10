import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// --- Helper to safely display text (object or string) ---
const displayText = (value) => {
  if (!value) return "Unknown";
  if (typeof value === "string") return value;
  if (typeof value === "object") return value.name || value.email || JSON.stringify(value);
  return String(value);
};

const LatestResolvedIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResolvedIssues = async () => {
      try {
        // Fetch issues with status=Resolved
        const res = await axios.get("http://localhost:3000/issues", {
          params: {
            status: "Resolved",
            limit: 6,
          },
        });

        // Sort by updatedAt descending
        const sorted = res.data.issues
          .filter(Boolean)
          .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));

        setIssues(sorted.slice(0, 6));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchResolvedIssues();
  }, []);

  if (loading)
    return <p className="text-center py-10 font-bold">Loading resolved issues...</p>;

  if (!issues.length)
    return <p className="text-center py-10 font-bold">No resolved issues found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Latest Resolved Issues</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <div key={issue._id} className="card bg-base-100 shadow-lg border">
            <figure>
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="text-lg font-bold">{issue.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{issue.category}</p>
              <p className="text-gray-500 text-sm mt-1">
                Location: {issue.location}
              </p>
              <p className="mt-2 text-sm text-gray-700">
                Posted by: {displayText(issue.postedBy)}
              </p>
              <Link
                to={`/issue/${issue._id}`}
                className="btn btn-primary mt-4 w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestResolvedIssues;
