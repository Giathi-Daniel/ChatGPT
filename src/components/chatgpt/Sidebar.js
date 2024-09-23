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
  getChatTime,
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
        className="relative h-screen p-4 overflow-y-auto bg-gray-100 dark:bg-gray-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Chat History</h2>
          <FaPlus
            className="text-xl cursor-pointer"
            onClick={handleNewChat}
            title="Start New Chat"
          />
        </div>

        {/* Chat List */}
        {Object.keys(chatHistory).length > 0 ? (
          Object.keys(chatHistory)
            .sort((a, b) => b - a) // Sort chats by newest first
            .map((chatId) => (
              <div key={chatId} className="mb-4">
                <div className="flex items-center justify-between">
                  <div
                    className="font-semibold cursor-pointer"
                    onClick={() => handleChatClick(chatId)}
                  >
                    {chatHistory[chatId].title || "Untitled Chat"} -{" "}
                    {getChatTime(chatId)}
                  </div>
                  <FaEllipsisV
                    className="cursor-pointer"
                    onClick={() =>
                      setIsChatOptionsOpen(
                        chatId === isChatOptionsOpen ? null : chatId
                      )
                    }
                  />
                </div>
                {isChatOptionsOpen === chatId && (
                  <div className="mt-2">
                    <button
                      className="block w-full text-left"
                      onClick={() =>
                        handleRenameChat(chatId, prompt("New title:"))
                      }
                    >
                      Rename
                    </button>
                    <button
                      className="block w-full text-left"
                      onClick={() => handleDeleteChat(chatId)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
        ) : (
          <div>No chat history</div>
        )}

        <div className="absolute bottom-4 left-4">
          <FaCog
            className="text-2xl cursor-pointer"
            onClick={() => setIsSettingsOpen(true)}
          />
        </div>
      </div>
    </Resizable>
  );
};

export default Sidebar;
