import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import { toast } from "react-toastify";
import Navbar from "./NavBar";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);


      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("✅Admin Login successful!");

     
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
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
            <Link
              to="/login"
              className="text-blue-500 hover:text-green-500 transition"
            >
              Login
            </Link>{" "}
            | Admin
          </h2>
          <div className="mb-4">
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-green-500 transition flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
