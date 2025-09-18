import { useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./NavBar";
import { BeatLoader } from "react-spinners";
import { HiEye, HiEyeOff } from "react-icons/hi";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
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
          <h2 className="text-2xl text-center font-bold mb-6">Register</h2>

          <div className="mb-4">
            <label className="block font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none transition"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none transition"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block font-medium mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none transition"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 text-gray-500 hover:text-green-500 transition"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-green-500 transition flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? <BeatLoader color="#fff" size={8} /> : "Register"}
          </button>

          <div className="mt-4 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-green-500 transition"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
