import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Reports() {
  const [modelId, setModelId] = useState(
    localStorage.getItem("modelId") || ""
  );
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("modelId");
    if (saved) setModelId(saved);
  }, []);

  const downloadReport = async () => {
    if (!modelId) {
      toast.error("No Model ID found");
      return;
    }

    try {
      setDownloading(true);

      const response = await fetch(
        `http://127.0.0.1:8000/federation/report/${modelId}`,
        {
          method: "POST"
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('content-disposition');
      let filename = `federation_report_${modelId}.pdf`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, '');
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Clean up the object URL
      window.URL.revokeObjectURL(url);

      // Show success toast with file info
      toast.success(
        <div>
          <strong>Report Downloaded Successfully!</strong>
          <br />
          <span className="text-sm">Model ID: {modelId}</span>
          <br />
          <span className="text-xs">File: {filename}</span>
          <br />
          <span className="text-xs">Size: {(blob.size / 1024).toFixed(2)} KB</span>
        </div>,
        {
          duration: 5000,
          style: {
            background: '#10b981',
            color: '#fff',
          },
        }
      );

    } catch (err) {
      console.error("Download error:", err);
      toast.error(
        <div>
          <strong>Download Failed</strong>
          <br />
          <span className="text-sm">Please try again</span>
        </div>,
        {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
        }
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      className="pt-24 px-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold mb-8">
        Download Federation Report
      </h2>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        {/* Model ID Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Model ID
          </label>
          <input
            type="text"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            placeholder="Enter Model ID (e.g., heart_model)"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the model ID for which you want to download the federation report
          </p>
        </div>

        {/* Download Button */}
        <button
          onClick={downloadReport}
          disabled={!modelId || downloading}
          className={`w-full py-3 rounded-lg text-white font-medium transition-all ${
            !modelId || downloading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
          }`}
        >
          {downloading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Downloading Report...
            </span>
          ) : (
            "Download Report"
          )}
        </button>

        {/* Instructions Card */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Report Information
          </h3>
          <p className="text-sm text-blue-700">
            The report will be downloaded as a PDF file containing comprehensive federation results including:
          </p>
          <ul className="text-sm text-blue-700 mt-2 list-disc list-inside">
            <li>Overall federation performance metrics</li>
            <li>Per-node evaluation results</li>
            <li>Fairness metrics and bias analysis</li>
            <li>Skipped nodes and reasons</li>
          </ul>
          {modelId && (
            <p className="text-sm font-medium text-blue-800 mt-2">
              Ready to download report for Model: <span className="font-bold">{modelId}</span>
            </p>
          )}
        </div>

        {/* Success Preview (shows when download is complete) */}
        {!downloading && modelId && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Click the button above to download your report
          </div>
        )}
      </div>
    </motion.div>
  );
}