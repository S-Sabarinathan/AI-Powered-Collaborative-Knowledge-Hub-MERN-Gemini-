import { useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import { BeatLoader } from "react-spinners";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/forgot-password", { email });
      toast.success("Password reset link sent!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-2xl text-center font-bold mb-6">
            Forgot Password
          </h2>

          <div className="mb-4">
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-green-500 transition flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? <BeatLoader color="#fff" size={8} /> : "Send Reset Link"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
