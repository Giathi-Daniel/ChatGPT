import React from 'react';

const Lockout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-6 text-2xl">You are locked out</h2>
      <p>You have exceeded the maximum number of login attempts. Please try again in 3 hours.</p>
    </div>
  );
};

export default Lockout;
