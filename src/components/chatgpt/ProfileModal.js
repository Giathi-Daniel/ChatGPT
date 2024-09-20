import React from "react";
import Modal from "react-modal";

const ProfileModal = ({ isProfileOpen, setIsProfileOpen }) => {
  return (
    <Modal isOpen={isProfileOpen} onRequestClose={() => setIsProfileOpen(false)} contentLabel="User Profile">
      <h2>User Profile</h2>
      <p>Name: John Doe</p>
      <p>Email: john.doe@example.com</p>
      <button onClick={() => setIsProfileOpen(false)}>Close</button>
    </Modal>
  );
};

export default ProfileModal;
