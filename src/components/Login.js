import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ColorRing } from 'react-loader-spinner';
import { auth } from '../firebase/config';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loadingEmailLogin, setLoadingEmailLogin] = useState(false);
  const [loadingGoogleLogin, setLoadingGoogleLogin] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const isMounted = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    const lockoutEnd = localStorage.getItem('lockoutEnd');
    if (lockoutEnd && new Date().getTime() < parseInt(lockoutEnd)) {
      setIsLockedOut(true);
    } else {
      localStorage.removeItem('lockoutEnd');
      setIsLockedOut(false);
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleRecaptchaToken = async () => {
    console.log('Site Key:', process.env.REACT_APP_SITE_KEY); 
    return new Promise((resolve, reject) => {
      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(
            process.env.REACT_APP_SITE_KEY,
            { action: 'LOGIN' }
          );
          resolve(token); 
        } catch (error) {
          reject(error);
        }
      });
    });
  };
  

  const handleLogin = async (event) => {
    event.preventDefault();

    if (isLockedOut) {
      setError('Your account is locked. Please try again later.');
      return;
    }

    if (!recaptchaVerified) {
      setError('Please verify the reCAPTCHA.');
      return;
    }

    setLoadingEmailLogin(true);
    try {
      const token = await handleRecaptchaToken();
      console.log("reCAPTCHA Token:", token);

      await signInWithEmailAndPassword(auth, email, password);
      if (isMounted.current) navigate('/profile');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      const failedAttempts = parseInt(localStorage.getItem('failedAttempts') || '0') + 1;
      localStorage.setItem('failedAttempts', failedAttempts);
      if (failedAttempts >= 3) {
        localStorage.setItem('lockoutEnd', new Date().getTime() + 3 * 60 * 60 * 1000); // 3 hours
        setIsLockedOut(true);
        localStorage.removeItem('failedAttempts');
      }
    } finally {
      if (isMounted.current) setLoadingEmailLogin(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isLockedOut) {
      setError('Your account is locked. Please try again later.');
      return;
    }

    setLoadingGoogleLogin(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      if (isMounted.current) navigate('/profile');
    } catch (err) {
      if (isMounted.current) {
        setError('Google login failed. Please try again.');
        setLoadingGoogleLogin(false);
      }
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
            sitekey={process.env.REACT_APP_SITE_KEY}
            onChange={handleRecaptcha}
          />
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 font-semibold text-white transition duration-150 ease-in-out bg-blue-500 rounded hover:bg-blue-600"
          disabled={loadingEmailLogin || isLockedOut}
        >
          {loadingEmailLogin ? (
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
          disabled={loadingGoogleLogin || isLockedOut}
        >
          {loadingGoogleLogin ? (
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
        <div className="mt-4 text-center ">
          <p>
            Forgot password? <Link to="/reset-password" className="text-blue-500 hover:underline">Reset Here</Link>
          </p>
          <p className="mt-4">
            Don’t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
