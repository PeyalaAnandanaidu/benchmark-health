import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [modelId, setModelId] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("modelId");
    if (saved) setModelId(saved);
  }, []);

  const runFederation = async () => {
    if (!modelId) {
      toast.error("Upload model first.");
      return;
    }

    try {
      setLoading(true);
      setResults(null);

      const response = await axios.post(
        `http://127.0.0.1:8000/federation/run/${modelId}`
      );

      setResults(response.data);
      toast.success("Federation Completed Successfully!");
    } catch (error) {
      console.error(error.response?.data);
      toast.error("Federation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="pt-24 px-6 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold mb-8">
        Federation Dashboard
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow mb-8">

        <input
          type="text"
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          placeholder="Model ID"
          className="border p-3 rounded-lg w-full mb-4"
        />

        <button
          onClick={runFederation}
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Running..." : "Run Federation"}
        </button>
      </div>

      {results && (
        <motion.div
          className="bg-white p-6 rounded-2xl shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-semibold mb-6">
            Federation Results
          </h3>

          <div className="grid grid-cols-3 gap-6 mb-6">

            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-blue-600">
                {results.accuracy ?? "N/A"}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-gray-600">Fairness Score</p>
              <p className="text-2xl font-bold text-green-600">
                {results.fairness_score ?? "N/A"}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-gray-600">Nodes</p>
              <p className="text-2xl font-bold text-purple-600">
                {results.nodes ?? "N/A"}
              </p>
            </div>

          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
