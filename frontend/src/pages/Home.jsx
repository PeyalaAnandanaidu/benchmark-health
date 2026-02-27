import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-24 px-6 max-w-6xl mx-auto"
    >
      <h1 className="text-4xl font-bold mb-6">
        Federated AI Evaluation Platform
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Benchmark Health enables secure federated evaluation of AI models
        across multiple hospitals without sharing sensitive data.
      </p>

      <div className="grid grid-cols-3 gap-6">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-blue-600 font-semibold">Privacy Preserving</h3>
          <p className="mt-2 text-gray-600">
            Models are evaluated locally at hospitals.
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-green-600 font-semibold">Bias Monitoring</h3>
          <p className="mt-2 text-gray-600">
            Track fairness metrics across nodes.
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-purple-600 font-semibold">Auto Reports</h3>
          <p className="mt-2 text-gray-600">
            Generate compliance-ready reports instantly.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
