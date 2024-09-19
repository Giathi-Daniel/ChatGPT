import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase/config';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { ColorRing } from 'react-loader-spinner'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('Please accept the terms and conditions');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setTimeout(() => setError(''), 3000);
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Account created successfully.');
      setTimeout(() => setMessage(''), 3000);
      navigate('/profile');
    } catch (error) {
      setError('Signup error. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate('/profile');
    } catch (error) {
      setError('Google Signup Error. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 overflow-y-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center">Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="relative flex flex-col mb-4">
            <label className="mb-2 text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <span
              className="absolute text-gray-500 cursor-pointer top-11 right-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div className="relative flex flex-col mb-4">
            <label className="mb-2 text-gray-700">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <span
              className="absolute text-gray-500 cursor-pointer top-11 right-4"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2"
              required
            />
            <span>I agree to the <a href="/" className="text-blue-500 underline">Terms and Conditions</a></span>
          </div>

          {error && <p className="mb-4 text-red-500">{error}</p>}
          {message && <p className="mb-4 text-green-500">{message}</p>}
          <button
            type="submit"
            className="w-full p-3 text-white transition duration-150 ease-in-out bg-blue-600 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? <ColorRing width="24" /> : 'Sign Up'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full p-3 text-white transition duration-150 ease-in bg-red-500 rounded-md hover:bg-red-600"
        >
          Sign Up with Google
        </button>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
