import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-white shadow-md">
      <h1 className="text-xl font-bold text-blue-600">AI Interview Platform</h1>
      <div className="space-x-4">
        <Link to="/register">
          <button className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
