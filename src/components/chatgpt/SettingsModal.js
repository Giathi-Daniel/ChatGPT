import React from "react";
import Modal from "react-modal";

const SettingsModal = ({ isSettingsOpen, setIsSettingsOpen, handleDeleteAllChats }) => {
  return (
    <Modal isOpen={isSettingsOpen} onRequestClose={() => setIsSettingsOpen(false)} contentLabel="Settings">
      <h2>Settings</h2>
      <button onClick={handleDeleteAllChats}>Delete All Chat History</button>
      <button onClick={() => setIsSettingsOpen(false)}>Close</button>
    </Modal>
  );
};

export default SettingsModal;
