import React from "react";
import Modal from "react-modal";

const ProfileModal = ({ isProfileOpen, setIsProfileOpen, user }) => {
  return (
    <Modal
      isOpen={isProfileOpen}
      onRequestClose={() => setIsProfileOpen(false)}
      contentLabel="User Profile"
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>

        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
        )}

        <p className="text-lg font-semibold">
          {user?.name || "Anonymous User"}
        </p>

        <p className="text-gray-500 mb-4">
          {user?.email || "No email available"}
        </p>

        <button
          onClick={() => setIsProfileOpen(false)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ProfileModal;
