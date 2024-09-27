import React from "react";
import Modal from "react-modal";

const SettingsModal = ({ isSettingsOpen, setIsSettingsOpen, handleDeleteAllChats }) => {
  return (
    <Modal
      isOpen={isSettingsOpen}
      onRequestClose={() => setIsSettingsOpen(false)}
      contentLabel="Settings"
      ariaHideApp={false}
      className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg w-fit mx-auto mt-20"
    >
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <button
        className="block w-full mb-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleDeleteAllChats}
      >
        Delete All Chat History
      </button>
      <button
        className="block w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setIsSettingsOpen(false)}
      >
        Close
      </button>
    </Modal>
  );
};

export default SettingsModal;
