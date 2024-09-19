import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ColorRing } from 'react-loader-spinner';
import { auth } from '../firebase/config';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!recaptchaVerified) {
      setError('Please verify the reCAPTCHA.');
      return;
    }

    setEmailLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/profile');
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleRecaptcha = (value) => {
    setRecaptchaVerified(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg"
      >
        <h2 className="mb-8 text-3xl font-bold text-center">Login</h2>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 py-2"
          >
            <img
              src={showPassword ? '/icons/eye-open.svg' : '/icons/eye-closed.svg'}
              alt="Toggle visibility"
              className="w-5 h-5"
            />
          </button>
        </div>
        <div className="mb-4">
          <ReCAPTCHA
            sitekey="YOUR_RECAPTCHA_KEY"
            onChange={handleRecaptcha}
          />
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 font-semibold text-white transition duration-150 ease-in-out bg-blue-500 rounded hover:bg-blue-600"
          disabled={emailLoading}
        >
          {emailLoading ? (
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
            'Login'
          )}
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 font-semibold text-white transition duration-150 ease-in bg-red-500 rounded hover:bg-red-600"
          disabled={googleLoading}
        >
          {googleLoading ? (
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
            'Login with Google'
          )}
        </button>
        <div className="mt-4 text-center">
          <p>
            Forgot password? <a href="/reset-password" className="font-semibold text-blue-500">Reset here</a>
          </p>
          <p className="mt-4">
            Don’t have an account? <a href="/signup" className="font-semibold text-blue-500">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
