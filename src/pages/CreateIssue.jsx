import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";

const CreateIssue = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Road");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  // Mutation for creating issue
  const createIssueMutation = useMutation({
    mutationFn: async (newIssue) => {
      const res = await axios.post("http://localhost:3000/issues", newIssue);
      return res.data;
    },
    onSuccess: () => {
      // Refetch my-issues query to update UI
      queryClient.invalidateQueries(["my-issues", user?.email]);
      navigate("/dashboard/my-issues");
    },
    onError: (err) => {
      console.error(err);
      alert("Failed to create issue 😢");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first!");
      return;
    }

    const newIssue = {
      title,
      description,
      category,
      location,
      image,
      postedBy: user.email,
      status: "Pending",
      priority: "Normal",
      upvotes: 0,
      timeline: [
        {
          status: "Pending",
          message: "Issue reported by citizen",
          updatedBy: user.email,
          date: new Date(),
        },
      ],
    };

    createIssueMutation.mutate(newIssue);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Issue</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input input-bordered w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="textarea textarea-bordered w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full"
        >
          <option>Road</option>
          <option>Garbage</option>
          <option>Water</option>
          <option>Streetlight</option>
          <option>Others</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input input-bordered w-full"
        />

        <button
          type="submit"
          className={`btn btn-primary ${createIssueMutation.isLoading ? "loading" : ""}`}
          disabled={createIssueMutation.isLoading}
        >
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default CreateIssue;
