import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = UseAuth();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const displayText = (value) => {
    if (!value) return "Unknown";
    if (typeof value === "string") return value;
    if (typeof value === "object") return value.name || value.email || JSON.stringify(value);
    return String(value);
  };

  useEffect(() => {
    const loadIssue = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await axios.get(`${API_URL}/issues/${id}`);
        const found = res.data;

        if (!found) {
          alert("Issue not found");
          navigate("/all-issues");
          return;
        }

        if (!found.timeline || found.timeline.length === 0) {
          found.timeline = [
            {
              status: "Pending",
              message: "Issue reported by citizen",
              updatedBy: displayText(found.postedBy),
              date: found.createdAt ? new Date(found.createdAt) : new Date(),
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

    loadIssue();
  }, [id, navigate]);

  if (loading)
    return (
      <div className="flex justify-center py-20 text-xl font-bold">
        Loading... 😴
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow-lg border rounded-xl overflow-hidden">
        <figure>
          <img
            src={issue.image || "https://via.placeholder.com/600x350?text=No+Image"}
            alt={issue.title}
            className="w-full h-[350px] md:h-[450px] object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-primary">{issue.title}</h2>

          <div className="flex gap-2 flex-wrap mb-3">
            <span className="badge badge-primary">{issue.category}</span>
            <span className="badge badge-secondary">{issue.status}</span>
            <span
              className={`badge ${
                issue.priority?.toLowerCase() === "high" ? "badge-error" : "badge-success"
              }`}
            >
              {issue.priority}
            </span>
          </div>

          <p className="text-gray-600 text-lg mb-4">
            📍 <span className="font-semibold">{issue.location}</span>
          </p>

          <p className="mb-4 leading-relaxed">{issue.description || "No description available."}</p>

          <p className="text-sm text-gray-500 mb-6">
            Posted by: <span className="font-semibold">{displayText(issue.postedBy)}</span>
          </p>

          {/* TIMELINE */}
          {issue.timeline && issue.timeline.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4 text-primary">Issue Timeline 📝</h3>
              <div className="flex flex-col gap-4">
                {issue.timeline
                  .slice()
                  .reverse()
                  .map((t, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-4 h-4 mt-2 rounded-full border-2 border-blue-500 bg-white flex-shrink-0"></div>
                      <div className="flex-1 p-4 border-l-4 border-blue-500 bg-gray-50 rounded shadow-sm">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span
                            className={`badge ${
                              t.status?.toLowerCase() === "resolved"
                                ? "badge-success"
                                : t.status?.toLowerCase() === "in-progress"
                                ? "badge-warning"
                                : t.status?.toLowerCase() === "closed"
                                ? "badge-error"
                                : "badge-primary"
                            }`}
                          >
                            {t.status}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {new Date(t.date).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm mb-1">{t.message}</p>
                        <p className="text-gray-500 text-xs">By: {displayText(t.updatedBy)}</p>
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
