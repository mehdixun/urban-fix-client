// src/pages/MyIssues.jsx
import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import UseAuth from "../hooks/UseAuth";
import { Link } from "react-router-dom";

const MyIssues = () => {
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const [editModal, setEditModal] = useState(false);
  const [editIssueData, setEditIssueData] = useState(null);

  const { data: issues = [], isLoading, isError } = useQuery({
    queryKey: ["my-issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/issues?postedBy=${user.email}`
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    if (user?.isBlocked) return alert("You are blocked! Cannot delete issues.");
    const confirm = window.confirm("Are you sure you want to delete this issue?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/issues/${id}`);
      alert("Issue deleted successfully!");
      queryClient.invalidateQueries(["my-issues", user?.email]);
    } catch (err) {
      alert("Delete failed!");
      console.log(err);
    }
  };

  const openEditModal = (issue) => {
    if (user?.isBlocked) return alert("You are blocked! Cannot edit issues.");
    setEditIssueData(issue);
    setEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, title, description, category, location } = editIssueData;
      await axios.put(`http://localhost:3000/issue/${_id}`, {
        title,
        description,
        category,
        location,
      });
      alert("Issue updated successfully!");
      setEditModal(false);
      queryClient.invalidateQueries(["my-issues", user?.email]);
    } catch (err) {
      console.log(err);
      alert("Update failed!");
    }
  };

  if (!user)
    return <p className="text-center py-10">Please login to see your issues.</p>;

  if (user.isBlocked)
    return <p className="text-center py-10 text-red-500">
      You are blocked! Contact authorities.
    </p>;

  if (!user.isPremium && issues.length >= 3)
    return <p className="text-center py-10">
      Free users can submit up to 3 issues only. <Link to="/dashboard/profile" className="text-blue-500 underline">Subscribe</Link> to submit more.
    </p>;

  if (isLoading)
    return <p className="text-center py-10 font-bold text-xl">Loading your issues...</p>;
  if (isError)
    return <p className="text-center py-10 text-red-500">Something went wrong!</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Issues</h1>

      {issues.length === 0 ? (
        <p className="text-gray-500">You haven't submitted any issues yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="card bg-base-100 shadow-lg border rounded-lg overflow-hidden"
            >
              <figure>
                <img
                  src={issue.image || "/default-image.png"}
                  alt={issue.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-xl font-bold">{issue.title}</h2>

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

                <p className="mt-2 text-gray-600">{issue.description}</p>

                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/issue/${issue._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </Link>
                  <span className="text-sm text-gray-500">{issue.upvotes} 👍</span>
                </div>

                <div className="mt-4 flex gap-2">
                  {user?.email === issue.postedBy && issue.status === "Pending" && (
                    <button
                      onClick={() => openEditModal(issue)}
                      className="btn btn-sm btn-warning"
                    >
                      ✏️ Edit
                    </button>
                  )}
                  {user?.email === issue.postedBy && (
                    <button
                      onClick={() => handleDelete(issue._id)}
                      className="btn btn-sm btn-error"
                    >
                      🗑 Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editModal && editIssueData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Issue</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={editIssueData.title}
                onChange={(e) => setEditIssueData({...editIssueData, title: e.target.value})}
                className="input input-bordered"
                placeholder="Title"
                required
              />
              <textarea
                value={editIssueData.description}
                onChange={(e) => setEditIssueData({...editIssueData, description: e.target.value})}
                className="textarea textarea-bordered"
                placeholder="Description"
                required
              ></textarea>
              <input
                type="text"
                value={editIssueData.category}
                onChange={(e) => setEditIssueData({...editIssueData, category: e.target.value})}
                className="input input-bordered"
                placeholder="Category"
                required
              />
              <input
                type="text"
                value={editIssueData.location}
                onChange={(e) => setEditIssueData({...editIssueData, location: e.target.value})}
                className="input input-bordered"
                placeholder="Location"
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssues;
