import React from "react";
import { FaCog, FaEllipsisV, FaPlus } from "react-icons/fa";
import { Resizable } from "react-resizable";

const Sidebar = ({
  chatHistory,
  handleChatClick,
  handleRenameChat,
  handleDeleteChat,
  isChatOptionsOpen,
  setIsChatOptionsOpen,
  sidebarWidth,
  setSidebarWidth,
  setIsSettingsOpen,
  handleNewChat,
}) => {
  return (
    <Resizable
      width={sidebarWidth}
      height={Infinity}
      onResize={(e, { size }) => setSidebarWidth(size.width)}
    >
      <div
        style={{ inlineSize: sidebarWidth }}
        className="relative h-screen p-4 bg-[#000] shadow-md"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Chat History</h2>
          <FaPlus
            className="text-[#F0F0F0] text-xl cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
            onClick={handleNewChat}
            title="Start New Chat"
            aria-label="Start New Chat"
          />
        </div>

        {Object.keys(chatHistory).length > 0 ? (
          Object.keys(chatHistory)
            .sort((a, b) => new Date(chatHistory[b].timestamp) - new Date(chatHistory[a].timestamp)) // Assuming you have a timestamp field
            .map((chatId) => (
              <div key={chatId} className="mb-4">
                <div className="flex items-center justify-between">
                  <div
                    className="font-semibold text-white cursor-pointer rounded-md p-2 hover:bg-[#1b1818] transition duration-300 ease-in-out"
                    onClick={() => handleChatClick(chatId)}
                  >
                    {chatHistory[chatId].title || "Untitled Chat"}
                  </div>
                  <FaEllipsisV
                    className="text-[#F0F0F0] cursor-pointer hover:font-bold transition duration-300 ease-in-out"
                    onClick={() =>
                      setIsChatOptionsOpen(
                        chatId === isChatOptionsOpen ? null : chatId
                      )
                    }
                  />
                </div>
                {isChatOptionsOpen === chatId && (
                  <div className="mt-2 bg-[#1b1818] p-2 rounded-md absolute z-10 right-0 shadow-lg">
                    <button
                      className="block w-full text-left hover:bg-gray-500 rounded-md transition duration-300 ease-in-out py-1 px-2 text-[#F0F0F0]"
                      onClick={() =>
                        handleRenameChat(chatId, prompt("New title:"))
                      }
                    >
                      Rename
                    </button>
                    <button
                      className="block w-full text-left hover:bg-gray-500 rounded-md transition duration-300 ease-in-out py-1 px-2 text-white"
                      onClick={() => handleDeleteChat(chatId)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
        ) : (
          <div className="text-[#F0F0F0]">No chat history</div>
        )}

        <div className="absolute bottom-4 left-4">
          <FaCog
            className="text-2xl cursor-pointer hover:text-blue-500"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Open Settings"
          />
        </div>
      </div>
    </Resizable>
  );
};

export default Sidebar;
