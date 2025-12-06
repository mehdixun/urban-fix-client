import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

const AllIssues = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  // Fetch
  useEffect(() => {
    axios.get("/issues.json").then((res) => {
      setIssues(res.data);
      setFiltered(sortBoosted(res.data));
    });
  }, []);

  // Boosted sorting function
  const sortBoosted = (data) => {
    return [...data].sort((a, b) => {
      if (a.priority === "High" && b.priority !== "High") return -1;
      if (a.priority !== "High" && b.priority === "High") return 1;
      return 0;
    });
  };

  // Filter system
  useEffect(() => {
    let data = [...issues];

    if (search) {
      data = data.filter((i) =>
        i.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) data = data.filter((i) => i.category === category);
    if (status) data = data.filter((i) => i.status === status);
    if (priority) data = data.filter((i) => i.priority === priority);

    setFiltered(sortBoosted(data));
  }, [search, category, status, priority, issues]);

  // Upvote System
  const handleUpvote = (issue) => {
    if (!user) return navigate("/login");

    if (issue.postedBy === user.email) {
      alert("Bro নিজের issue তে vote মারা যায় না 😭");
      return;
    }

    if (issue.upvotedUsers?.includes(user.email)) {
      alert("Already upvoted!");
      return;
    }

    const updatedIssue = {
      ...issue,
      upvotes: issue.upvotes + 1,
      upvotedUsers: [...(issue.upvotedUsers || []), user.email],
    };

    // instant UI update
    setIssues((prev) =>
      prev.map((i) => (i.id === issue.id ? updatedIssue : i))
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">All Issues</h2>

      {/* Search + Filter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search issue..."
          className="input input-bordered"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option>Electricity</option>
          <option>Water Supply</option>
          <option>Road</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Priority</option>
          <option>High</option>
          <option>Normal</option>
        </select>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((issue) => (
          <div
            key={issue.id}
            className="card bg-base-100 shadow-xl border border-gray-200"
          >
            <figure>
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-48 object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{issue.title}</h2>

              <div className="flex gap-2 flex-wrap">
                <span className="badge badge-primary">{issue.category}</span>
                <span className="badge badge-secondary">{issue.status}</span>
                <span
                  className={`badge ${
                    issue.priority === "High"
                      ? "badge-error"
                      : "badge-success"
                  }`}
                >
                  {issue.priority}
                </span>
              </div>

              <p className="text-gray-600 mt-2">{issue.location}</p>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => handleUpvote(issue)}
                  className="btn btn-sm btn-outline"
                >
                  👍 {issue.upvotes}
                </button>

                <Link
                  to={`/issue/${issue.id}`}
                  className="btn btn-sm btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No issues found 😴</p>
      )}
    </div>
  );
};

export default AllIssues;
