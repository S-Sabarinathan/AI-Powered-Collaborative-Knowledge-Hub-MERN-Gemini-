import { useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./NavBar";
import { BeatLoader } from "react-spinners";
import { HiEye, HiEyeOff } from "react-icons/hi";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful!");
      navigate("/geminidocs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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
            Login{" "}|{" "}
            <Link
              to="/adminlogin"
              className="text-blue-500 hover:text-green-500 transition"
            >
              Admin
            </Link>
          </h2>

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
              className="absolute right-3 top-11 text-gray-500 hover:text-green-500"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>

          <div className="mb-4 text-right">
            <Link
              to="/forgot"
              className="text-blue-500 hover:text-green-500 transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-green-500 transition flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? <BeatLoader color="#fff" size={8} /> : "Login"}
          </button>

          <div className="mt-4 text-center">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-green-500 transition"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
