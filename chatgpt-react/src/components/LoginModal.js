import React from 'react'
import { useAuth } from "../context/AuthContext"

const LoginModal = () => {
  const { loginWithGoogle } = useAuth();


  return (
    <div className='bg-gray-200 p-6 rounded-lg shadow-lg text-center'>
      <h2 className='text-2xl mb-4'>Sign in to continue chatting</h2>
      <button
        onClick={loginWithGoogle}
        className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out'
      >
        Sign in with Google
      </button>
    </div>
  )
}

export default LoginModal