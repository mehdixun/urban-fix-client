import React, { useState, useEffect } from "react";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";

const UserProfile = () => {
  const { user } = UseAuth(); // Firebase user
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    photoURL: "",
    role: "",
    isPremium: false,
    isBlocked: false,
  });
  const [loading, setLoading] = useState(true);

  // Fetch user info from backend
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`http://localhost:3000/users/${user.email}`);
        if (res.data) {
          setUserInfo({
            name: res.data.name || "",
            email: res.data.email || "",
            photoURL: res.data.photoURL || "",
            role: res.data.role || "",
            isPremium: res.data.isPremium || false,
            isBlocked: res.data.isBlocked || false,
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed to fetch profile",
          text: err.response?.data?.message || err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      Swal.fire({
        icon: "error",
        title: "No user logged in",
      });
      return;
    }

    try {
      // Update backend
      const res = await axios.put(`http://localhost:3000/users/${user.email}`, {
        name: userInfo.name,
        photoURL: userInfo.photoURL,
      });

      // Update Firebase profile safely
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

      // Update local state with latest data
      if (res.data.user) {
        setUserInfo((prev) => ({
          ...prev,
          name: res.data.user.name,
          photoURL: res.data.user.photoURL,
        }));
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || err.message || "Please try again!",
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {userInfo.isBlocked && (
        <p className="text-red-500 font-semibold mb-4">
          Your account is blocked. Please contact authorities.
        </p>
      )}

      <form
        onSubmit={handleUpdateProfile}
        className="space-y-4 bg-base-100 p-6 shadow rounded"
      >
        <div className="flex items-center gap-4">
          <img
            src={userInfo.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <input
            type="text"
            value={userInfo.photoURL}
            onChange={(e) =>
              setUserInfo({ ...userInfo, photoURL: e.target.value })
            }
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
        />

        <input
          type="email"
          value={userInfo.email}
          disabled
          className="input input-bordered w-full bg-gray-200"
        />

        <div>
          <p>
            <strong>Role:</strong> {userInfo.role || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {userInfo.isPremium ? "Premium" : "Free User"}
          </p>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
