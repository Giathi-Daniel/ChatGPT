import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config'; 
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner'; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">Profile</h2>
        {user ? (
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <img
                src={user.photoURL || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 border border-gray-300 rounded-full"
              />
            </div>
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-semibold text-gray-800">{user.displayName || 'User Name'}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full p-3 text-white transition duration-150 ease-in-out bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        ) : (
            <ColorRing width="24" />
        )}
      </div>
    </div>
  );
};

export default Profile;
