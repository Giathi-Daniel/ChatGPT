import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent.');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (err) {
      setError('Failed to send reset email.');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePasswordReset();
        }}
        className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg"
      >
        <h2 className="mb-8 text-3xl font-bold text-center">Reset Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="w-full p-3 border border-gray-300 rounded"
        />
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {message && <p className="mb-4 text-green-500">{message}</p>}
        <button
          type="submit"
          className="w-full py-3 font-semibold text-white transition duration-150 ease-in bg-blue-500 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? (
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          ) : (
            'Send Password Reset Email'
          )}
        </button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full py-3 mt-4 font-semibold text-white transition duration-150 ease-in bg-gray-500 rounded hover:bg-gray-600"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
