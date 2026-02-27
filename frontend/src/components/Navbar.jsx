import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const active = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
        <h1 className="text-xl font-bold text-blue-600">
          Benchmark Health
        </h1>

        <div className="flex gap-6">
          <Link to="/" className={active("/")}>Home</Link>
          <Link to="/upload" className={active("/upload")}>Upload</Link>
          <Link to="/dashboard" className={active("/dashboard")}>Dashboard</Link>
          
          <Link to="/reports" className={active("/reports")}>Reports</Link>
        </div>
      </div>
    </nav>
  );
}
