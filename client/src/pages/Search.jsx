import { useState, useEffect, useCallback } from "react";
import API from "../utils/api";
import Navbar from "./NavBar";
import { BeatLoader } from "react-spinners"; 

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const res = await API.post("/geminidocs/search", { query });
      setResults(res.data);
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (!query) return setResults([]);
    const timeoutId = setTimeout(() => {
      fetchResults();
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [query, fetchResults]);

  const highlightText = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Semantic Search</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 flex-1 rounded shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={fetchResults}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Search
          </button>
        </div>

        {loading && (
          <div className="flex justify-center my-4">
            <BeatLoader color="#22c55e" />
          </div>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {results.length === 0 && !loading && query && (
          <p className="text-gray-500 mb-4">No results found.</p>
        )}

        <div className="grid gap-4">
          {results.map((doc) => (
            <div
              key={doc._id}
              className="border p-4 rounded shadow-sm hover:shadow-lg transition bg-white"
            >
              <h2 className="font-semibold text-lg mb-1">
                {highlightText(doc.title)}
              </h2>
              <p className="mb-2">{highlightText(doc.summary)}</p>
              {doc.score !== undefined && (
                <small className="text-gray-400">
                  Score: {doc.score.toFixed(2)}
                </small>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
