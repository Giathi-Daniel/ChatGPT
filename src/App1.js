import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "./components/chatgpt/Sidebar";
import ChatWindow from "./components/chatgpt/ChatWindow";
import ProfileModal from "./components/chatgpt/ProfileModal";
import SettingsModal from "./components/chatgpt/SettingsModal";

function App1() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const chatId = currentChatId || Date.now();
      if (!currentChatId) {
        setCurrentChatId(chatId);
        setChatHistory((prev) => ({ ...prev, [chatId]: { title: input, messages: [] } }));
      }
      fetchResponse(input.trim(), chatId);
      setInput("");
    }
  };

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
    setChatHistory((prevHistory) => {
      const updatedMessages = [
        ...prevHistory[chatId]?.messages || [],
        { sender: "user", text: userMessage },
        { sender: "bot", text: botMessage },
      ];
      return {
        ...prevHistory,
        [chatId]: {
          ...prevHistory[chatId],
          messages: updatedMessages,
        },
      };
    });
  };

  const handleChatClick = (chatId) => {
    setCurrentChatId(chatId);
    setMessages(chatHistory[chatId].messages);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"} flex`}>
      <Sidebar
        chatHistory={chatHistory}
        handleChatClick={handleChatClick}
        handleRenameChat={() => {}}
        handleDeleteChat={() => {}}
        isChatOptionsOpen={isChatOptionsOpen}
        setIsChatOptionsOpen={setIsChatOptionsOpen}
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
        getChatTime={() => {}}
        setIsSettingsOpen={setIsSettingsOpen}
      />
      <ChatWindow
        messages={messages}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
      <ProfileModal
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
      />
      <SettingsModal
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        handleDeleteAllChats={() => {}}
      />
    </div>
  );
}

export default App1;
