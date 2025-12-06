import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";

const AllIssues = () => {
  const { user } = UseAuth();
  const [issues, setIssues] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Filters / Search
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  // Load Issues
  useEffect(() => {
    axios.get("http://localhost:5000/issues").then((res) => {
      const sorted = [
        ...res.data.filter((i) => i.boosted === true),
        ...res.data.filter((i) => i.boosted !== true),
      ];
      setIssues(sorted);
      setFiltered(sorted);
    });
  }, []);

  // Filtering + search
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

    setFiltered(data);
  }, [search, category, status, priority, issues]);

  // Upvote feature
  const handleUpvote = async (issue) => {
    if (!user) return (window.location.href = "/login");

    if (issue.email === user.email) {
      return alert("Bro you cannot upvote your own issue 😭");
    }

    // If user already upvoted
    if (issue.upvoters?.includes(user.email)) {
      return alert("You already upvoted this issue! 😤");
    }

    const updated = {
      upvote: issue.upvote + 1,
      upvoters: [...issue.upvoters, user.email],
    };

    const res = await axios.patch(
      `http://localhost:5000/issues/${issue._id}`,
      updated
    );

    if (res.data.modifiedCount > 0) {
      const updatedIssues = filtered.map((i) =>
        i._id === issue._id ? { ...i, ...updated } : i
      );
      setFiltered(updatedIssues);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        All Public Issues
      </h2>

      {/* Search + Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search issues..."
          className="input input-bordered"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="In-Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Priority</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
        </select>
      </div>

      {/* All Issue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((issue) => (
          <div key={issue._id} className="card bg-base-100 shadow-lg border">

            <figure>
              <img
                src={issue.image}
                alt={issue.title}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {issue.title}
                {issue.boosted && (
                  <span className="badge badge-warning ml-2">Boosted</span>
                )}
              </h2>

              <p className="text-gray-600">{issue.location}</p>

              <div className="flex gap-2 mt-2">
                <span className="badge badge-primary">{issue.category}</span>
                <span className="badge badge-info">{issue.status}</span>
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

              <div className="flex justify-between items-center mt-4">
                {/* Upvote */}
                <button
                  onClick={() => handleUpvote(issue)}
                  className="btn btn-sm btn-outline"
                >
                  👍 {issue.upvote}
                </button>

                <Link
                  to={`/issue/${issue._id}`}
                  className="btn btn-sm btn-primary"
                >
                  View Details
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllIssues;
