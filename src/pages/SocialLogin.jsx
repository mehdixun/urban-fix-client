import React from "react";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { signInGoogle } = UseAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInGoogle();

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome, ${user.displayName || user.email}`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Please try again!",
      });
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center gap-2 bg-white border px-5 py-2.5 rounded-lg hover:bg-gray-50"
      >
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>

        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
