import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import UseAuth from "../hooks/UseAuth";
import { Link } from "react-router-dom";

const MyIssues = () => {
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const [editModal, setEditModal] = useState(false);
  const [editIssueData, setEditIssueData] = useState(null);

  if (!user)
    return <p className="text-center py-10">Please login to see your issues.</p>;

  const { data: issues = [], isLoading, isError } = useQuery({
    queryKey: ["my-issues", user.email],
    enabled: !!user.email,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/issues?postedBy=${user.email}`);
      return res.data.issues;  // <-- backend return object, take issues array
    },
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:3000/issues/${id}`);
      alert("Issue deleted!");
      queryClient.invalidateQueries(["my-issues", user.email]);
    } catch (err) {
      console.log(err);
      alert("Delete failed!");
    }
  };

  const openEditModal = (item) => {
    setEditIssueData(item);
    setEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { _id, title, description, category, location } = editIssueData;

    try {
      await axios.put(`http://localhost:3000/issues/${_id}`, { title, description, category, location });
      alert("Issue updated!");
      setEditModal(false);
      queryClient.invalidateQueries(["my-issues", user.email]);
    } catch (err) {
      console.log(err);
      alert("Update failed!");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error loading data.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Issues</h1>

      {issues.length === 0 ? (
        <p className="text-gray-500">You haven’t posted any issues yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div key={issue._id} className="card border shadow-lg rounded-lg">
              <figure>
                <img
                  src={issue.image || "/default-image.png"}
                  alt={issue.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-xl font-bold">{issue.title}</h2>

                <div className="mt-2 flex gap-2 flex-wrap">
                  <span className="badge badge-primary">{issue.category}</span>
                  <span className="badge badge-secondary">{issue.status}</span>
                </div>

                <p className="mt-2">{issue.description}</p>

                <div className="mt-4 flex justify-between items-center">
                  <Link to={`/issues/${issue._id}`} className="btn btn-sm btn-primary">
                    View Details
                  </Link>
                  <span>{issue.upvotes} 👍</span>
                </div>

                <div className="mt-4 flex gap-2">
                  {user.email === issue.postedBy && (
                    <>
                      <button className="btn btn-sm btn-warning" onClick={() => openEditModal(issue)}>✏️ Edit</button>
                      <button className="btn btn-sm btn-error" onClick={() => handleDelete(issue._id)}>🗑 Delete</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editModal && editIssueData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Issue</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input type="text" value={editIssueData.title} onChange={(e) => setEditIssueData({ ...editIssueData, title: e.target.value })} className="input input-bordered" required />
              <textarea value={editIssueData.description} onChange={(e) => setEditIssueData({ ...editIssueData, description: e.target.value })} className="textarea textarea-bordered" required></textarea>
              <input type="text" value={editIssueData.category} onChange={(e) => setEditIssueData({ ...editIssueData, category: e.target.value })} className="input input-bordered" required />
              <input type="text" value={editIssueData.location} onChange={(e) => setEditIssueData({ ...editIssueData, location: e.target.value })} className="input input-bordered" required />
              <div className="mt-2 flex justify-end gap-2">
                <button type="button" className="btn btn-outline" onClick={() => setEditModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssues;
