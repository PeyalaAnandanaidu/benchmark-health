import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UploadModel from "./pages/UploadModel";
import Reports from "./pages/Reports";

function App() {
  return (
    <Router>
      <Navbar />

      {/* Toast container must be INSIDE return */}
      

      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadModel />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
