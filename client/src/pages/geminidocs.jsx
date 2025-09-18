import { useState, useEffect } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import Navbar from "./NavBar";
import { Pencil, Trash2, PlusCircle, X } from "lucide-react";

function Docs() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [docs, setDocs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await API.get("/geminidocs");
      setDocs(res.data);
    } catch (err) {
      toast.error(
        `❌ Failed to load docs: ${err.response?.data?.message || err.message}`
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await API.put(`/geminidocs/${editingId}`, form);
        setDocs(docs.map((d) => (d._id === editingId ? res.data : d)));
        toast.success("✅ Document updated!");
        setEditingId(null);
      } else {
        const res = await API.post("/geminidocs", form);
        setDocs([res.data, ...docs]);
        toast.success("✅ Document created!");
      }
      setForm({ title: "", content: "" });
      setIsModalOpen(false); 
    } catch (err) {
      const errorMsg =
        err.response?.data?.details ||
        err.response?.data?.message ||
        err.message ||
        "Unknown error";
      toast.error(`❌ Failed: ${errorMsg}`);
    }
  };

  const handleEdit = (doc) => {
    setForm({ title: doc.title, content: doc.content });
    setEditingId(doc._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;
    try {
      await API.delete(`/geminidocs/${id}`);
      setDocs(docs.filter((d) => d._id !== id));
      toast.info("🗑️ Document deleted");
    } catch (err) {
      const errorMsg =
        err.response?.data?.details ||
        err.response?.data?.message ||
        err.message ||
        "Unknown error";
      toast.error(`❌ Delete failed: ${errorMsg}`);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📄 AI Docs</h1>
          <button
            onClick={() => {
              setForm({ title: "", content: "" });
              setEditingId(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            <PlusCircle size={18} /> Add Doc
          </button>
        </div>

       
        {docs.length === 0 ? (
          <p className="text-gray-500 text-center">
            No documents yet. Add one above! 🚀
          </p>
        ) : (
          <div className="grid gap-4">
            {docs.map((doc) => (
              <div
                key={doc._id}
                className="border p-4 rounded-lg bg-white shadow hover:shadow-lg transition-transform hover:scale-[1.01]"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {doc.title}
                </h2>
                <p className="text-gray-600 mt-1">{doc.summary}</p>

                <div className="flex gap-2 mt-2 flex-wrap">
                  {doc.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleEdit(doc)}
                    className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Document" : "Add Document"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <textarea
                className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none min-h-[120px]"
                placeholder="Content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Docs;
