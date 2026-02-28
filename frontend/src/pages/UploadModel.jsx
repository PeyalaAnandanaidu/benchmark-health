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

      // Create FormData to send the actual file
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/models/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Get model ID from response (based on your backend response)
      const id = response.data.model_id;
      
      if (!id) {
        console.error("Unexpected response structure:", response.data);
        toast.error("Upload succeeded but couldn't extract model ID");
        return;
      }

      localStorage.setItem("modelId", id);
      setModelId(id);

      // Show success message with model ID
      const successMessage = `Model uploaded successfully!\n\nModel ID: ${id}`;
      
      // Show alert with model ID
      alert(`✅ ${successMessage}`);
      
      // Also show toast notification
      toast.success(
        <div>
          <strong>Model Uploaded Successfully!</strong>
          <br />
          <span className="text-sm">Model ID: {id}</span>
        </div>,
        {
          duration: 5000,
          style: {
            background: '#10b981',
            color: '#fff',
          },
        }
      );

      setFile(null);
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      toast.error(error.response?.data?.detail || "Upload failed. Please try again.");
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
        {/* File Input */}
        <input
          type="file"
          accept=".pkl,.joblib,.h5,.pt,.pth"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-3 w-full rounded-lg mb-4"
        />

        {file && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Selected:</span> {file.name}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Size: {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className={`w-full py-3 rounded-lg text-white font-medium transition-all ${
            loading || !file
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
          ) : (
            "Upload Model"
          )}
        </button>

        {modelId && (
          <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-lg border border-green-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Uploaded Model ID:</span>
            </div>
            <code className="block mt-2 bg-green-200 p-2 rounded text-sm">
              {modelId}
            </code>
          </div>
        )}
      </div>
    </motion.div>
  );
}