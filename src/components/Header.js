import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed z-10 w-full py-4 bg-white shadow-md">
      <div className="container flex items-center justify-between px-6 mx-auto">
        <div className="text-2xl font-bold">
          <Link to="/home">ChatGPT</Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/about" className="text-gray-700 hover:text-blue-500">About</Link></li>
            <li><Link to="/contact-us" className="text-gray-700 hover:text-blue-500">Contact</Link></li>
            <li><Link to="/login" className="text-blue-500 hover:underline">Login</Link></li>
            <li><Link to="/signup" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Sign Up</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
