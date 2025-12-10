import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../components/Loader"; // Loader component import

const ITEMS_PER_PAGE = 6;

const AllIssues = () => {
  const { user, loading: authLoading } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [issues, setIssues] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // new loading state

  useEffect(() => {
    if (!authLoading) fetchIssues();
    // eslint-disable-next-line
  }, [authLoading]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/issues", { params: { page: 1, limit: 100 } });
      setIssues(res.data.issues || []);
    } catch (err) {
      console.error("Fetch issues error:", err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const applyFilters = () => {
      let data = [...issues];
      if (search) {
        const q = search.trim().toLowerCase();
        data = data.filter(
          i =>
            (i.title || "").toLowerCase().includes(q) ||
            (i.location || "").toLowerCase().includes(q)
        );
      }
      if (category) data = data.filter(i => i.category === category);
      if (status) data = data.filter(i => i.status === status);
      if (priority) data = data.filter(i => i.priority === priority);

      if (user?.role === "staff") data = data.filter(i => i.assignedStaff?.email === user.email);

      data.sort((a, b) => {
        if (a.priority === "High" && b.priority !== "High") return -1;
        if (a.priority !== "High" && b.priority === "High") return 1;
        return (b.upvotes || 0) - (a.upvotes || 0);
      });

      setFiltered(data);
      setCurrentPage(1);
    };

    applyFilters();
  }, [issues, search, category, status, priority, user]);

  if (authLoading || loading) return <Loader />; // show Loader when fetching

  const handleUpvote = async (issue) => {
    if (!user?.email) return navigate("/login");
    if (issue.postedBy === user.email) {
      alert("You cannot upvote your own issue.");
      return;
    }

    const already = issue.upvotedUsers?.includes(user.email);
    const optimistic = {
      ...issue,
      upvotes: (issue.upvotes || 0) + (already ? -1 : 1),
      upvotedUsers: already
        ? issue.upvotedUsers.filter(e => e !== user.email)
        : [...(issue.upvotedUsers || []), user.email]
    };
    setIssues(prev => prev.map(i => i._id === issue._id ? optimistic : i));

    try {
      const res = await axiosSecure.patch(`/issues/toggle-upvote/${issue._id}`, { email: user.email });
      const updated = res.data;
      setIssues(prev => prev.map(i => i._id === updated._id ? updated : i));
    } catch (err) {
      console.error(err);
      fetchIssues(); // rollback by refetch
    }
  };

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentIssues = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">All Issues</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input type="text" placeholder="Search..." className="input input-bordered" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="select select-bordered" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Category</option><option>Electricity</option><option>Water Supply</option><option>Road</option><option>Cleanliness</option>
        </select>
        <select className="select select-bordered" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">Status</option><option>Pending</option><option>In-Progress</option><option>Resolved</option><option>Closed</option>
        </select>
        <select className="select select-bordered" value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="">Priority</option><option>High</option><option>Normal</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentIssues.map(issue => {
          const alreadyUpvoted = issue.upvotedUsers?.includes(user?.email);
          return (
            <div key={issue._id} className="card bg-base-100 shadow-xl border border-gray-200">
              <figure><img src={issue.image || "https://via.placeholder.com/600x350?text=No+Image"} alt={issue.title} className="w-full h-48 object-cover" /></figure>
              <div className="card-body">
                <h2 className="card-title">{issue.title}</h2>
                <div className="flex gap-2 flex-wrap mt-1">
                  <span className="badge badge-primary">{issue.category}</span>
                  <span className="badge badge-secondary">{issue.status}</span>
                  <span className={`badge ${issue.priority === "High" ? "badge-error" : "badge-success"}`}>{issue.priority}</span>
                </div>
                <p className="text-gray-600 mt-2">{issue.location}</p>
                <div className="flex items-center justify-between mt-4">
                  {(!user?.role || user?.role === "citizen") && (
                    <button onClick={() => handleUpvote(issue)} className={`btn btn-sm ${alreadyUpvoted ? "btn-success text-white" : "btn-outline"}`} disabled={issue.postedBy === user?.email}>👍 {issue.upvotes || 0}</button>
                  )}
                  <Link to={`/issue/${issue._id}`} className="btn btn-sm btn-primary">View Details</Link>
                  {user?.role === "admin" && <Link to={`/dashboard/edit-issue/${issue._id}`} className="btn btn-sm btn-warning">✏️ Edit / Assign</Link>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && <p className="text-center text-gray-500 mt-10">No issues found 😴</p>}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllIssues;