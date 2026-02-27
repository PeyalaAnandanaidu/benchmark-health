import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Reports() {
  const [modelId, setModelId] = useState(
    localStorage.getItem("modelId") || ""
  );

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
    const response = await fetch(
      `http://127.0.0.1:8000/federation/report/${modelId}`,
      {
        method: "POST"
      }
    );

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `federation_report_${modelId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

  } catch (err) {
    console.error(err);
    toast.error("Download failed.");
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

        <input
          type="text"
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          placeholder="Enter Model ID"
          className="border p-3 rounded-lg w-full mb-6"
        />

        <button
          onClick={downloadReport}
          className="w-full py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          Download Report
        </button>

      </div>
    </motion.div>
  );
}
