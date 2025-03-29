import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">MERN</h1>

        {/* Navigation Links */}
        <nav className="flex gap-6">
          <Link
            to="/"
            className="text-lg hover:text-gray-300 transition duration-200"
          >
            Create Post
          </Link>
          <Link
            to="/all"
            className="text-lg hover:text-gray-300 transition duration-200"
          >
            All Posts
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
