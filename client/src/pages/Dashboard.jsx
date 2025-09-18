import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "./NavBar";
import { toast } from "react-toastify";
import { FiFileText } from "react-icons/fi";

function Dashboard() {
  const [stats, setStats] = useState({
    docs: 0,
  });
  const [recentDocs, setRecentDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentDocs();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/geminidocs");
      setStats({
        docs: res.data.length,
      });
    } catch (err) {
      toast.error("Failed to load stats",err);
    }
  };

  const fetchRecentDocs = async () => {
    try {
      const res = await API.get("/geminidocs");
      setRecentDocs(res.data.slice(0, 5));
    } catch (err) {
      toast.error("Failed to load recent docs",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-extrabold mb-6">📊 Dashboard</h1>

        {/* Stats Cards */}
        <div className=" sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1">
            <FiFileText className="text-blue-600 text-4xl mx-auto mb-2" />
            <h2 className="text-xl font-semibold">Documents</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.docs}</p>
          </div>
        </div>
   
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">📝 Recent Documents</h2>
          {loading ? (
            <p className="text-gray-400 animate-pulse">Loading...</p>
          ) : recentDocs.length === 0 ? (
            <p className="text-gray-500">No documents yet.</p>
          ) : (
            <ul className="divide-y">
              {recentDocs.map((doc) => (
                <li
                  key={doc._id}
                  className="py-4 hover:bg-gray-50 transition rounded px-2"
                >
                  <h3 className="font-semibold text-lg">{doc.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{doc.summary}</p>
                  <div className="flex gap-2 flex-wrap">
                    {doc.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-sm rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
