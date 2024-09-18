import React, { useState, useEffect } from "react";
import axios from "axios";
import { Resizable } from "react-resizable";
import { FaCog, FaEllipsisV, FaUserCircle } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement("#root"); // For accessibility reasons

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState({});
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatOptionsOpen, setIsChatOptionsOpen] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(300);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Fetch OpenAI response
  const fetchResponse = async (userMessage, chatId) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const url = "https://api.openai.com/v1/completions";

    try {
      const response = await axios.post(
        url,
        {
          model: "text-davinci-003",
          prompt: userMessage,
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const botMessage = response.data.choices[0].text.trim();
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: userMessage },
        { sender: "bot", text: botMessage },
      ]);
      
      updateChatHistory(chatId, userMessage, botMessage);
    } catch (error) {
      console.error("Error fetching GPT response:", error);
    }
  };

  const updateChatHistory = (chatId, userMessage, botMessage) => {
    setChatHistory(prevHistory => {
      const updatedChat = {
        ...prevHistory[chatId],
        messages: [...prevHistory[chatId].messages, { sender: "user", text: userMessage }, { sender: "bot", text: botMessage }]
      };
      return { ...prevHistory, [chatId]: updatedChat };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const chatId = currentChatId || Date.now();
      if (!currentChatId) {
        setCurrentChatId(chatId);
        setChatHistory((prev) => ({
          ...prev,
          [chatId]: { title: input, messages: [] },
        }));
      }
      fetchResponse(input.trim(), chatId);
      setInput("");
    }
  };

  const handleChatClick = (chatId) => {
    setCurrentChatId(chatId);
    setMessages(chatHistory[chatId].messages);
  };

  const getChatTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return "Last 7 Days";
    return date.toLocaleDateString();
  };

  const handleRenameChat = (chatId, newTitle) => {
    setChatHistory(prevHistory => ({
      ...prevHistory,
      [chatId]: { ...prevHistory[chatId], title: newTitle },
    }));
  };

  const handleDeleteChat = (chatId) => {
    setChatHistory((prev) => {
      const { [chatId]: _, ...rest } = prev;
      return rest;
    });
    setCurrentChatId(null);
    setMessages([]);
  };

  const handleDeleteAllChats = () => {
    setChatHistory({});
    setCurrentChatId(null);
    setMessages([]);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"} flex`}>
      {/* Sidebar */}
      <Resizable width={sidebarWidth} height={Infinity} onResize={(e, { size }) => setSidebarWidth(size.width)}>
        <div style={{ width: sidebarWidth }} className="h-screen bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Chat History</h2>

          {/* Display chat history */}
          {Object.keys(chatHistory).length > 0 ? (
            Object.keys(chatHistory).map((chatId) => (
              <div key={chatId} className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="font-semibold cursor-pointer" onClick={() => handleChatClick(chatId)}>
                    {chatHistory[chatId].title || "Untitled Chat"} - {getChatTime(chatId)}
                  </div>
                  <FaEllipsisV
                    className="cursor-pointer"
                    onClick={() => setIsChatOptionsOpen(chatId === isChatOptionsOpen ? null : chatId)}
                  />
                </div>

                {isChatOptionsOpen === chatId && (
                  <div className="mt-2">
                    <button className="block w-full text-left" onClick={() => handleRenameChat(chatId, prompt("New title:"))}>
                      Rename
                    </button>
                    <button className="block w-full text-left" onClick={() => handleDeleteChat(chatId)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No chat history</div>
          )}

          {/* Settings Icon */}
          <div className="absolute bottom-4 left-4">
            <FaCog className="cursor-pointer text-2xl" onClick={() => setIsSettingsOpen(true)} />
          </div>
        </div>
      </Resizable>

      {/* Main Chat Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between p-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Profile Icon */}
          <FaUserCircle
            className="cursor-pointer text-2xl"
            onClick={() => setIsProfileOpen(true)}
          />
        </div>

        <div className="chat-window bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 h-[60vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex p-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 rounded-l-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700"
            placeholder="Ask anything..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-lg"
          >
            Send
          </button>
        </form>
      </div>

      {/* Profile Modal */}
      <Modal isOpen={isProfileOpen} onRequestClose={() => setIsProfileOpen(false)} contentLabel="User Profile">
        <h2>User Profile</h2>
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
        <button onClick={() => setIsProfileOpen(false)}>Close</button>
      </Modal>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onRequestClose={() => setIsSettingsOpen(false)} contentLabel="Settings">
        <h2>Settings</h2>
        <button onClick={handleDeleteAllChats}>Delete All Chat History</button>
        <button onClick={() => setIsSettingsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default App;
