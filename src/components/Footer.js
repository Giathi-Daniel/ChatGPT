import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="py-6 text-white bg-gray-900">
        <div className="container px-6 mx-auto text-center">
          <p>&copy; 2024 ChatGPT. All rights reserved.</p>
          <div className="mt-4">
            <Link to="/" className="mx-2 text-gray-400 hover:text-gray-300">Privacy Policy</Link>
            <Link to="/" className="mx-2 text-gray-400 hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>
      </footer>
  )
}

export default Footer