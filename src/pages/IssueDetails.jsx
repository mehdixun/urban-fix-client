import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";

const IssueDetails = () => {
  const { id } = useParams(); // MongoDB _id
  const navigate = useNavigate();
  const { user } = UseAuth();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    loadIssue();
  }, [id]);

  const displayText = (value) => {
    if (!value) return "Unknown";
    if (typeof value === "string") return value;
    if (typeof value === "object") return value.name || value.email || JSON.stringify(value);
    return String(value);
  };

  const loadIssue = async () => {
    try {
      // Directly get issue by MongoDB _id
      const res = await axios.get(`http://localhost:3000/issues/${id}`);
      const found = res.data;

      if (!found) {
        alert("Issue not found");
        navigate("/all-issues");
        return;
      }

      // Add default timeline if missing
      if (!found.timeline || found.timeline.length === 0) {
        found.timeline = [
          {
            status: "Pending",
            message: "Issue reported by citizen",
            updatedBy: displayText(found.postedBy),
            date: found.createdAt || new Date(),
          },
          {
            status: "In-Progress",
            message: "Issue assigned to Staff: John Doe",
            updatedBy: "Admin",
            date: found.updatedAt || new Date(),
          },
          {
            status: "In-Progress",
            message: "Work started on the issue",
            updatedBy: "Staff John Doe",
            date: new Date(),
          },
          {
            status: "Resolved",
            message: "Issue marked as resolved",
            updatedBy: "Staff John Doe",
            date: new Date(),
          },
          {
            status: "Closed",
            message: "Issue closed by staff",
            updatedBy: "Staff John Doe",
            date: new Date(),
          },
        ];
      }

      setIssue(found);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Issue not found");
      navigate("/all-issues");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20 text-xl font-bold">
        Loading... 😴
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="card bg-base-100 shadow-xl border">
        <figure>
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-[350px] object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="text-3xl font-bold">{issue.title}</h2>

          <div className="flex gap-2 flex-wrap mt-2">
            <span className="badge badge-primary">{issue.category}</span>
            <span className="badge badge-secondary">{issue.status}</span>
            <span
              className={`badge ${
                issue.priority === "High" ? "badge-error" : "badge-success"
              }`}
            >
              {issue.priority}
            </span>
          </div>

          <p className="text-gray-600 mt-3 text-lg">
            📍 <span className="font-semibold">{issue.location}</span>
          </p>

          <p className="mt-4 leading-relaxed">{issue.description || "No description"}</p>

          <p className="text-sm text-gray-500 mt-4">
            Posted by: <span className="font-semibold">{displayText(issue.postedBy)}</span>
          </p>

          {/* TIMELINE / STEP UI */}
          {issue.timeline && issue.timeline.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-4">Issue Timeline</h3>
              <div className="flex flex-col gap-4">
                {issue.timeline
                  .slice()
                  .reverse() // latest on top
                  .map((t, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      {/* Timeline dot */}
                      <div className="w-4 h-4 mt-2 rounded-full border-2 border-blue-500 bg-white flex-shrink-0"></div>
                      {/* Timeline content */}
                      <div className="flex-1 p-3 border-l-4 border-blue-500 bg-gray-50 rounded">
                        <div className="flex justify-between text-sm">
                          <span
                            className={`badge ${
                              t.status === "Resolved"
                                ? "badge-success"
                                : t.status === "In-Progress"
                                ? "badge-warning"
                                : t.status === "Closed"
                                ? "badge-error"
                                : "badge-primary"
                            }`}
                          >
                            {t.status}
                          </span>
                          <span className="text-gray-400">
                            {new Date(t.date).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-1 text-sm">{t.message}</p>
                        <p className="text-gray-500 text-xs">
                          By: {displayText(t.updatedBy)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
