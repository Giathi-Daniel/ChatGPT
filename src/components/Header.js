import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="fixed z-10 w-full py-4 transition-colors bg-white shadow-md dark:bg-gray-800">
      <div className="container flex items-center justify-between px-6 mx-auto">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          <Link to="/">ChatGPT</Link>
        </div>

        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-gray-700 dark:text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
            </svg>
          </button>
        </div>

        <nav className={`flex-1 lg:flex lg:items-center ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
          <ul className="flex flex-col space-y-4 lg:space-y-0 lg:space-x-6 lg:flex-row lg:items-center">
            <li><Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">About</Link></li>
            <li><Link to="/contact-us" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">Contact</Link></li>
            <li><Link to="/login" className="text-blue-500 hover:underline">Login</Link></li>
            <li><Link to="/signup" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Sign Up</Link></li>
          </ul>
        </nav>

        <div className="flex items-center">
          <button onClick={toggleTheme} className="ml-4 text-gray-700 dark:text-gray-200 focus:outline-none">
            <img src={theme === 'light' ? <FaMoon /> : <MdOutlineWbSunny />} alt="Toggle Theme" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
