import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-24 px-6 max-w-6xl mx-auto"
    >
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Federated AI Evaluation Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Benchmark Health enables secure, privacy-preserving evaluation of AI models
          across multiple hospitals without sharing sensitive patient data.
        </p>
      </div>

      {/* What is Federated Evaluation? */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 p-8 rounded-2xl mb-12"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-800">What is Federated Evaluation?</h2>
        <p className="text-gray-700 leading-relaxed">
          Traditional AI model evaluation requires centralizing data from multiple sources, 
          which raises privacy concerns and regulatory challenges. Our federated approach brings 
          the evaluation to the data - not the other way around. Models are sent to participating 
          hospitals, evaluated locally on their private datasets, and only anonymous performance 
          metrics are returned. This ensures patient data never leaves the hospital while still 
          providing comprehensive insights into model performance across diverse populations.
        </p>
      </motion.div>

      {/* Key Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500"
        >
          <div className="text-blue-600 mb-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Privacy Preserving</h3>
          <p className="text-gray-600">
            Models are evaluated locally at hospitals - raw patient data never leaves the institution. 
            Only aggregated, anonymous metrics are shared, ensuring compliance with HIPAA and GDPR.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500"
        >
          <div className="text-green-600 mb-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-green-600 mb-2">Bias Monitoring</h3>
          <p className="text-gray-600">
            Track fairness metrics across different demographic groups and institutions. 
            Identify and mitigate algorithmic bias before it affects patient care.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500"
        >
          <div className="text-purple-600 mb-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-purple-600 mb-2">Auto Reports</h3>
          <p className="text-gray-600">
            Generate comprehensive, compliance-ready reports instantly. 
            Includes performance metrics, fairness analysis, and per-node breakdowns in PDF format.
          </p>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl shadow-inner mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: 1, title: "Upload Model", desc: "Upload your trained AI model to the platform" },
            { step: 2, title: "Distribute to Nodes", desc: "Model is securely sent to participating hospitals" },
            { step: 3, title: "Local Evaluation", desc: "Each hospital evaluates the model on their private data" },
            { step: 4, title: "Aggregate Results", desc: "Anonymous metrics are collected and analyzed" }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Benefits for Healthcare */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-bold mb-3 text-blue-800">🏥 For Hospitals</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              No patient data leaves your institution
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Evaluate models on your actual patient population
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Compare performance across institutions anonymously
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Generate audit-ready compliance reports
            </li>
          </ul>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-bold mb-3 text-purple-800">🤖 For AI Developers</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Test models on diverse, real-world data
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Identify fairness issues across demographic groups
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Get detailed performance metrics per institution
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Accelerate regulatory approval with built-in documentation
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-3">Ready to Evaluate Your Model?</h2>
        <p className="mb-4 opacity-90">
          Join leading healthcare institutions in secure, privacy-preserving AI evaluation
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
          Get Started
        </button>
      </motion.div>

      {/* Footer Note */}
      <p className="text-center text-xs text-gray-400 mt-8">
        Benchmark Health - Secure Federated Evaluation for Healthcare AI
      </p>
    </motion.div>
  );
}