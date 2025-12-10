import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = UseAuth();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect non-logged-in users
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Load issue data
  useEffect(() => {
    loadIssue();
  }, [id]);

  const loadIssue = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/issues/${id}`);
      setIssue(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // Upvote
  const handleUpvote = async () => {
    if (!user) return navigate("/login");
    try {
      const res = await axios.patch(
        `http://localhost:3000/issues/toggle-upvote/${id}`,
        { email: user.email }
      );
      setIssue((prev) => ({ ...prev, ...res.data }));
    } catch (err) {
      alert(err.response?.data?.message || "Upvote failed");
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;
    try {
      await axios.delete(`http://localhost:3000/issues/${id}`);
      alert("Deleted successfully");
      navigate("/all-issues");
    } catch {
      alert("Delete failed");
    }
  };

  // Boost
  const handleBoost = async () => {
    if (issue.priority === "High") return;
    alert("Payment successful! Issue boosted 🔥");
    try {
      const res = await axios.patch(
        `http://localhost:3000/issues/boost/${id}`,
        { boosted: true }
      );
      setIssue((prev) => ({ ...prev, ...res.data }));
    } catch {
      alert("Boost failed");
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

          <p className="mt-4 leading-relaxed">{issue.description}</p>

          <p className="text-sm text-gray-500 mt-4">
            Posted by: <span className="font-semibold">{issue.postedBy}</span>
          </p>

          {issue.assignedStaff && (
            <div className="mt-5 p-4 border rounded bg-gray-50">
              <h3 className="font-bold text-lg">Assigned Staff</h3>
              <p>Name: {issue.assignedStaff.name}</p>
              <p>Email: {issue.assignedStaff.email}</p>
            </div>
          )}

          {issue.timeline && issue.timeline.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-2">Issue Timeline</h3>
              <div className="flex flex-col-reverse gap-3">
                {issue.timeline
                  .slice()
                  .reverse()
                  .map((t, idx) => (
                    <div
                      key={idx}
                      className="p-3 border-l-4 border-blue-500 bg-gray-50 rounded"
                    >
                      <div className="flex justify-between text-sm">
                        <span
                          className={`badge ${
                            t.status === "Resolved"
                              ? "badge-success"
                              : t.status === "In-Progress"
                              ? "badge-warning"
                              : t.status === "Boosted"
                              ? "badge-success"
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
                      <p className="text-gray-500 text-xs">By: {t.updatedBy}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <button className="btn btn-primary" onClick={handleUpvote}>
              👍 Upvote ({issue.upvotes})
            </button>
          </div>

          <div className="mt-8 flex gap-4">
            {user?.email === issue.postedBy && issue.status === "Pending" && (
              <Link to={`/edit-issue/${id}`} className="btn btn-warning">
                ✏️ Edit
              </Link>
            )}
            {user?.email === issue.postedBy && (
              <button onClick={handleDelete} className="btn btn-error">
                🗑 Delete
              </button>
            )}
            {issue.priority !== "High" && (
              <button className="btn btn-success" onClick={handleBoost}>
                🚀 Boost Priority (100৳)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
