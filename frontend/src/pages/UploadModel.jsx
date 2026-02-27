import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function UploadModel() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modelId, setModelId] = useState(
    localStorage.getItem("modelId") || ""
  );

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a model file first");
      return;
    }

    try {
      setLoading(true);

      // 🔥 Send only file name as JSON (since backend expects ModelSchema)
      const response = await axios.post(
        "http://127.0.0.1:8000/models/upload",
        {
          model_name: file.name
        }
      );

      const id = response.data.model._id;

      localStorage.setItem("modelId", id);
      setModelId(id);

      toast.success("Model Uploaded Successfully!");
      setFile(null);
    } catch (error) {
      console.error(error.response?.data);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="pt-24 px-6 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold mb-8">
        Upload AI Model
      </h2>

      <div className="bg-white p-8 rounded-2xl shadow-lg">

        {/* Browse Option */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-3 w-full rounded-lg mb-4"
        />

        {file && (
          <p className="text-sm text-gray-600 mb-4">
            Selected: {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload Model"}
        </button>

        {modelId && (
          <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-lg">
            ✅ Uploaded Model ID: {modelId}
          </div>
        )}
      </div>
    </motion.div>
  );
}
