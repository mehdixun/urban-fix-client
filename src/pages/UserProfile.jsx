import React, { useState, useEffect } from "react";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

const UserProfile = () => {
  const { user } = UseAuth();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    photoURL: "",
    isPremium: false,
    isBlocked: false,
  });
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:3000";

  // ================= FETCH USER DATA =================
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API_BASE}/users/${encodeURIComponent(user.email.toLowerCase())}`);
        if (res.data) {
          setUserInfo({
            name: res.data.name || "",
            email: res.data.email || "",
            photoURL: res.data.photoURL || "",
            isPremium: res.data.isPremium || false,
            isBlocked: res.data.isBlocked || false,
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed to fetch profile",
          text: err.response?.data?.message || err.message || "User not found",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // ================= UPDATE PROFILE =================
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      Swal.fire({ icon: "error", title: "No user logged in" });
      return;
    }

    try {
      // Backend update
      await axios.put(`${API_BASE}/users/${encodeURIComponent(user.email.toLowerCase())}`, {
        name: userInfo.name,
        photoURL: userInfo.photoURL,
      });

      // Firebase update
      if (user.updateProfile) {
        await user.updateProfile({
          displayName: userInfo.name,
          photoURL: userInfo.photoURL,
        });
      }

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || err.message || "Please try again!",
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

      {userInfo.isBlocked && (
        <p className="text-red-500 font-semibold mb-4 text-center">
          Your account is blocked. Please contact support.
        </p>
      )}

      <form onSubmit={handleUpdateProfile} className="space-y-4 bg-base-100 p-6 shadow-xl rounded-lg">
        <div className="flex items-center gap-4">
          <img
            src={userInfo.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <input
            type="text"
            value={userInfo.photoURL}
            onChange={(e) => setUserInfo({ ...userInfo, photoURL: e.target.value })}
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />
        </div>

        <input
          type="text"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
        />

        <input
          type="email"
          value={userInfo.email}
          disabled
          className="input input-bordered w-full bg-gray-200"
        />

        <div className="flex justify-between text-sm text-gray-700 mt-2">
          <p><strong>Status:</strong> {userInfo.isPremium ? "Premium" : "Free User"}</p>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-3">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
