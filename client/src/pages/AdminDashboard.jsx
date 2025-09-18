import { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({
    docs: 0,
    users: 0,
    aiRequests: 0,
  });
  const [users, setUsers] = useState([]);
  const [allDocs, setAllDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const userRes = await API.get("/auth/users");
        setUsers(userRes.data);

        const docRes = await API.get("/geminidocs");
        setAllDocs(docRes.data);

        const docsCount = docRes.data.length;
        setStats({
          docs: docsCount,
          users: userRes.data.length,
          aiRequests: docsCount * 2,
        });
      } catch (err) {
        console.error("Dashboard load error:", err);
        toast.error("Failed to load dashboard data");
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Admin Logged out successfully!");
    navigate("/adminlogin");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold ">⚙️ Admin Dashboard</h1>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Documents</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.docs}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-3xl font-bold text-green-600">{stats.users}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">AI Requests</h2>
          <p className="text-3xl font-bold text-purple-600">
            {stats.aiRequests}
          </p>
        </div>
      </div>

      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">👥 Users</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">📑 All Documents</h2>
        <ul className="divide-y">
          {allDocs.map((doc) => (
            <li key={doc._id} className="py-3">
              <h3 className="font-semibold">{doc.title}</h3>
              <p className="text-gray-600 text-sm">{doc.summary}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-right">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
