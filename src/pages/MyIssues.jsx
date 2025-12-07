import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UseAuth from "../hooks/UseAuth";
import { Link } from "react-router-dom";

const MyIssues = () => {
  const { user } = UseAuth();

  const { data: issues, isLoading, isError } = useQuery({
    queryKey: ["my-issues", user?.email],
    enabled: !!user?.email, // only run if user exists
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/issues?postedBy=${user.email}`);
      return res.data;
    },
  });

  if (!user) return <p className="text-center py-10">Please login to see your issues.</p>;

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
            <div key={issue._id} className="card bg-base-100 shadow-lg border rounded-lg overflow-hidden">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIssues;
