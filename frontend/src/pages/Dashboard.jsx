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

  // Calculate summary statistics from results
  const getSummaryStats = () => {
    if (!results || !Array.isArray(results)) return null;

    const evaluatedNodes = results.filter(r => r.status === "evaluated");
    const skippedNodes = results.filter(r => r.status === "skipped");
    
    if (evaluatedNodes.length === 0) return null;

    // Calculate average metrics from evaluated nodes
    const avgAccuracy = evaluatedNodes.reduce((sum, node) => sum + (node.accuracy || 0), 0) / evaluatedNodes.length;
    const avgPrecision = evaluatedNodes.reduce((sum, node) => sum + (node.precision || 0), 0) / evaluatedNodes.length;
    const avgRecall = evaluatedNodes.reduce((sum, node) => sum + (node.recall || 0), 0) / evaluatedNodes.length;
    const avgF1 = evaluatedNodes.reduce((sum, node) => sum + (node.f1_score || 0), 0) / evaluatedNodes.length;
    const avgRocAuc = evaluatedNodes.reduce((sum, node) => sum + (node.roc_auc || 0), 0) / evaluatedNodes.length;
    const avgBiasGap = evaluatedNodes.reduce((sum, node) => sum + (node.bias_gap || 0), 0) / evaluatedNodes.length;

    return {
      totalNodes: results.length,
      evaluatedCount: evaluatedNodes.length,
      skippedCount: skippedNodes.length,
      avgAccuracy,
      avgPrecision,
      avgRecall,
      avgF1,
      avgRocAuc,
      avgBiasGap,
      evaluatedNodes,
      skippedNodes
    };
  };

  const stats = results ? getSummaryStats() : null;

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

      {results && stats && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">Total Nodes</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalNodes}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">Evaluated Nodes</p>
              <p className="text-2xl font-bold text-green-600">{stats.evaluatedCount}</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">Skipped Nodes</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.skippedCount}</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">Model ID</p>
              <p className="text-lg font-bold text-purple-600 truncate">{modelId}</p>
            </div>
          </div>

          {/* Average Metrics Card */}
          {stats.evaluatedCount > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-4">Average Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Accuracy</p>
                  <p className="text-lg font-bold text-blue-600">{(stats.avgAccuracy * 100).toFixed(2)}%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Precision</p>
                  <p className="text-lg font-bold text-green-600">{(stats.avgPrecision * 100).toFixed(2)}%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Recall</p>
                  <p className="text-lg font-bold text-yellow-600">{(stats.avgRecall * 100).toFixed(2)}%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">F1 Score</p>
                  <p className="text-lg font-bold text-purple-600">{(stats.avgF1 * 100).toFixed(2)}%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">ROC AUC</p>
                  <p className="text-lg font-bold text-indigo-600">{(stats.avgRocAuc * 100).toFixed(2)}%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Bias Gap</p>
                  <p className="text-lg font-bold text-red-600">{(stats.avgBiasGap * 100).toFixed(3)}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Results by Node */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4">Detailed Node Results</h3>
            
            {/* Evaluated Nodes */}
            {stats.evaluatedNodes.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 text-green-600">✓ Evaluated Nodes</h4>
                <div className="space-y-4">
                  {stats.evaluatedNodes.map((node, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-green-50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-lg">{node.node}</span>
                        <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                          Evaluated
                        </span>
                      </div>
                      
                      {/* Fairness Metric Display */}
                      {node.fairness_metric && (
                        <div className="mb-3 p-2 bg-white rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-1">Fairness Metric (by {node.fairness_metric.attribute})</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(node.fairness_metric.group_accuracy || {}).map(([group, accuracy]) => (
                              <div key={group} className="bg-gray-50 p-1 rounded">
                                <span className="text-gray-600">Group {group}: </span>
                                <span className="font-medium">{(accuracy * 100).toFixed(2)}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        {node.accuracy && (
                          <div className="bg-white p-2 rounded">
                            <span className="text-gray-600">Accuracy:</span>
                            <span className="ml-1 font-medium">{(node.accuracy * 100).toFixed(2)}%</span>
                          </div>
                        )}
                        {node.precision && (
                          <div className="bg-white p-2 rounded">
                            <span className="text-gray-600">Precision:</span>
                            <span className="ml-1 font-medium">{(node.precision * 100).toFixed(2)}%</span>
                          </div>
                        )}
                        {node.recall && (
                          <div className="bg-white p-2 rounded">
                            <span className="text-gray-600">Recall:</span>
                            <span className="ml-1 font-medium">{(node.recall * 100).toFixed(2)}%</span>
                          </div>
                        )}
                        {node.f1_score && (
                          <div className="bg-white p-2 rounded">
                            <span className="text-gray-600">F1 Score:</span>
                            <span className="ml-1 font-medium">{(node.f1_score * 100).toFixed(2)}%</span>
                          </div>
                        )}
                        {node.roc_auc && (
                          <div className="bg-white p-2 rounded">
                            <span className="text-gray-600">ROC AUC:</span>
                            <span className="ml-1 font-medium">{(node.roc_auc * 100).toFixed(2)}%</span>
                          </div>
                        )}
                        {node.bias_gap && (
                          <div className="bg-white p-2 rounded">
                            <span className="text-gray-600">Bias Gap:</span>
                            <span className="ml-1 font-medium">{(node.bias_gap * 100).toFixed(3)}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Skipped Nodes */}
            {stats.skippedNodes.length > 0 && (
              <div>
                <h4 className="text-lg font-medium mb-3 text-yellow-600">⚠ Skipped Nodes</h4>
                <div className="space-y-2">
                  {stats.skippedNodes.map((node, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-yellow-50 flex justify-between items-center">
                      <span className="font-medium">{node.node}</span>
                      <div className="text-sm">
                        <span className="text-yellow-700">Reason: {node.reason}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Raw JSON Data (Optional - for debugging) */}
          <details className="bg-gray-50 p-4 rounded-lg">
            <summary className="cursor-pointer text-gray-600 font-medium">View Raw Response Data</summary>
            <pre className="mt-2 p-4 bg-gray-800 text-gray-200 rounded-lg overflow-auto text-xs">
              {JSON.stringify(results, null, 2)}
            </pre>
          </details>
        </motion.div>
      )}
    </motion.div>
  );
}