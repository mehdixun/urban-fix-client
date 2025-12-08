import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

const API_BASE = "http://localhost:3000";

const AllIssues = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get(`${API_BASE}/issues`);
      setIssues(res.data || []);
    } catch (err) {
      console.error("Fetch issues error:", err);
    }
  };

  const sortBoosted = (arr) =>
    [...arr].sort((a, b) => {
      if (a.priority === "High" && b.priority !== "High") return -1;
      if (a.priority !== "High" && b.priority === "High") return 1;
      return (b.upvotes || 0) - (a.upvotes || 0);
    });

  const applyFilters = (list) => {
    let data = [...list];

    if (search) {
      const q = search.trim().toLowerCase();
      data = data.filter(
        (i) =>
          (i.title || "").toLowerCase().includes(q) ||
          (i.location || "").toLowerCase().includes(q)
      );
    }
    if (category) data = data.filter((i) => i.category === category);
    if (status) data = data.filter((i) => i.status === status);
    if (priority) data = data.filter((i) => i.priority === priority);

    // Role based filtering
    if (user?.role === "staff") {
      data = data.filter((i) => i.assignedStaff?.email === user.email);
    }

    return sortBoosted(data);
  };

  useEffect(() => {
    setFiltered(applyFilters(issues));
  }, [issues, search, category, status, priority, user]);

  const handleUpvote = async (issue) => {
    if (!user?.email) return navigate("/login");
    if (issue.postedBy === user.email) {
      alert("You cannot upvote your own issue.");
      return;
    }

    const already = issue.upvotedUsers?.includes(user.email);
    const optimisticIssue = {
      ...issue,
      upvotes: (issue.upvotes || 0) + (already ? -1 : 1),
      upvotedUsers: already
        ? issue.upvotedUsers.filter((e) => e !== user.email)
        : [...(issue.upvotedUsers || []), user.email],
    };

    const updatedIssues = issues.map((i) =>
      i._id === optimisticIssue._id ? optimisticIssue : i
    );
    setIssues(updatedIssues);
    setFiltered(applyFilters(updatedIssues));

    try {
      const res = await axios.patch(
        `${API_BASE}/issues/toggle-upvote/${issue._id}`,
        { email: user.email }
      );
      const serverIssue = res.data;
      const synced = updatedIssues.map((i) =>
        i._id === serverIssue._id ? serverIssue : i
      );
      setIssues(synced);
      setFiltered(applyFilters(synced));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upvote failed");
      fetchIssues();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">All Issues</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or location..."
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option>Electricity</option>
          <option>Water Supply</option>
          <option>Road</option>
          <option>Cleanliness</option>
        </select>
        <select
          className="select select-bordered"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option>Pending</option>
          <option>In-Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
        <select
          className="select select-bordered"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Priority</option>
          <option>High</option>
          <option>Normal</option>
        </select>
      </div>

      {/* Issue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((issue) => {
          const alreadyUpvoted = issue.upvotedUsers?.includes(user?.email);
          return (
            <div
              key={issue._id}
              className="card bg-base-100 shadow-xl border border-gray-200"
            >
              <figure>
                <img
                  src={issue.image || "https://via.placeholder.com/600x350?text=No+Image"}
                  alt={issue.title}
                  className="w-full h-48 object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">{issue.title}</h2>

                <div className="flex gap-2 flex-wrap mt-1">
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

                <p className="text-gray-600 mt-2">{issue.location}</p>

                <div className="flex items-center justify-between mt-4">
                  {/* ✅ Upvote button always shows for citizen */}
                  {(!user?.role || user?.role === "citizen") && (
                    <button
                      onClick={() => handleUpvote(issue)}
                      className={`btn btn-sm ${
                        alreadyUpvoted ? "btn-success text-white" : "btn-outline"
                      }`}
                      disabled={issue.postedBy === user.email}
                    >
                      👍 {issue.upvotes || 0}
                    </button>
                  )}

                  <Link to={`/issue/${issue._id}`} className="btn btn-sm btn-primary">
                    View Details
                  </Link>

                  {user?.role === "admin" && (
                    <Link
                      to={`/dashboard/edit-issue/${issue._id}`}
                      className="btn btn-sm btn-warning"
                    >
                      ✏️ Edit / Assign
                    </Link>
                  )}
                </div>

                {alreadyUpvoted && (!user?.role || user?.role === "citizen") && (
                  <p className="text-green-600 text-xs mt-2">You upvoted ✔</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No issues found 😴</p>
      )}
    </div>
  );
};

export default AllIssues;
