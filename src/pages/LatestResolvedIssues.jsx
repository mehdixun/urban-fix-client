import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const displayText = (value) => {
  if (!value) return "Unknown";
  if (typeof value === "string") return value;
  if (typeof value === "object") return value.name || value.email || "Unknown";
  return String(value);
};

const LatestResolvedIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResolvedIssues = async () => {
      try {
        const res = await axios.get("http://localhost:3000/issues");

        const data = Array.isArray(res.data) ? res.data : [];

        const sorted = data
          .filter((issue) => issue.status === "Resolved")
          .sort(
            (a, b) =>
              new Date(b.updatedAt || b.createdAt) -
              new Date(a.updatedAt || a.createdAt)
          );

        setIssues(sorted.slice(0, 6));
      } catch (err) {
        console.error("❌ Error fetching resolved issues:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResolvedIssues();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-10 font-bold text-gray-600">
        Loading resolved issues...
      </p>
    );
  }

  if (!issues.length) {
    return (
      <p className="text-center py-10 font-bold text-gray-600">
        No resolved issues found.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
        Latest Resolved Issues
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="
              group card bg-base-100 border rounded-xl overflow-hidden
              shadow-md transition-all duration-300 ease-in-out
              hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
            "
          >
            {/* IMAGE */}
            <figure className="overflow-hidden">
              <img
                src={issue.image || "https://via.placeholder.com/400x250?text=No+Image"}
                alt={issue.title}
                className="
                  w-full h-48 md:h-56 object-cover
                  transition-transform duration-300 ease-in-out
                  group-hover:scale-110
                "
              />
            </figure>

            {/* BODY */}
            <div className="card-body p-4 flex flex-col">
              <h3 className="text-lg md:text-xl font-semibold mb-1">
                {issue.title}
              </h3>

              <div className="flex gap-2 flex-wrap mb-2">
                <span className="badge badge-primary">{issue.category}</span>
                <span className="badge badge-success">{issue.status}</span>
                <span
                  className={`badge ${
                    issue.priority?.toLowerCase() === "high"
                      ? "badge-error"
                      : "badge-success"
                  }`}
                >
                  {issue.priority || "Normal"}
                </span>
              </div>

              <p className="text-gray-500 text-sm mb-1">
                📍 {issue.location || "Unknown"}
              </p>

              <p className="text-gray-600 text-sm mb-4">
                Posted by: {displayText(issue.postedBy)}
              </p>

              <Link
                to={`/issues/${issue._id}`}
                className="
                  btn btn-primary w-full mt-auto
                  transition-all duration-300
                  group-hover:scale-105
                "
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
