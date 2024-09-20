import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const Lockout = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
        <FaLock className="mb-4 text-4xl text-red-500" />
        <h2 className="mb-4 text-2xl font-bold">Account Locked</h2>
        <p className="mb-6 text-gray-700">
          You have exceeded the maximum number of login attempts. Your account is locked for 3 hours.
          <br />
          Please try again later or contact support if you need immediate assistance.
        </p>
        <button
          onClick={handleRetry}
          className="w-full py-3 font-semibold text-white transition duration-150 ease-in-out bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default Lockout;
