import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import Sidebar from "./components/chatgpt/Sidebar";
import ChatWindow from "./components/chatgpt/ChatWindow";
import ProfileModal from "./components/chatgpt/ProfileModal";
import SettingsModal from "./components/chatgpt/SettingsModal";
import { getAuth } from "firebase/auth";

function App1() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState({});
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatOptionsOpen, setIsChatOptionsOpen] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [user, setUser] = useState(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true); 

  const templatePrompts = [
    "What is the weather today?",
    "Tell me a joke.",
    "Surprise me",
    "Create image"
  ];

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser({
        name: currentUser.displayName || "Anonymous",
        email: currentUser.email,
        avatar: currentUser.photoURL || "https://example.com/default-avatar.png",
      });
    }
  }, []);

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
      setShowWelcomeMessage(false);
    }
  };

  const fetchResponse = async (userMessage, chatId) => {
    const url = "https://gemmie.onrender.com/api/prompt"; 

    try {
      const response = await axios.post(
        url,
        { prompt: userMessage },
        { headers: { "Content-Type": "application/json" } }
      );

      const botMessage = response.data.text.replace(/<[^>]+>/g, "").trim();
      setMessages((prevMessages) => [
        { sender: "user", text: userMessage },
        { sender: "bot", text: botMessage },
        ...prevMessages,
      ]);

      updateChatHistory(chatId, userMessage, botMessage);
    } catch (error) {
      console.error("Error fetching Gemini API response:", error);
    }
  };

  const updateChatHistory = (chatId, userMessage, botMessage) => {
    setChatHistory((prevHistory) => {
      const updatedMessages = [
        { sender: "user", text: userMessage },
        { sender: "bot", text: botMessage },
        ...(prevHistory[chatId]?.messages || []),
      ];
      return {
        ...prevHistory,
        [chatId]: { ...prevHistory[chatId], messages: updatedMessages },
      };
    });
  };

  const handleChatClick = (chatId) => {
    setCurrentChatId(chatId);
    setMessages(chatHistory[chatId].messages);
    setShowWelcomeMessage(true);
  };

  const handleTemplateClick = (prompt) => {
    setInput(prompt);
    setShowWelcomeMessage(false);
  };

  const handleDeleteChat = (chatId) => {
    const newChatHistory = { ...chatHistory };
    delete newChatHistory[chatId];
    setChatHistory(newChatHistory);
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
      setShowWelcomeMessage(true);
    }
  };

  // const handleOpenProfile = () => {
  //   setIsProfileOpen(true);
  // };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  // const handleOpenSettings = () => {
  //   setIsSettingsOpen(true);
  // };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen bg-[rgb(33,33,33)] text-white flex">
      <Sidebar
        chatHistory={chatHistory}
        handleChatClick={handleChatClick}
        handleRenameChat={() => {}}
        handleDeleteChat={handleDeleteChat}
        isChatOptionsOpen={isChatOptionsOpen}
        setIsChatOptionsOpen={setIsChatOptionsOpen}
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
      />
      <ChatWindow
        messages={messages}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        user={user}
        showWelcomeMessage={showWelcomeMessage} 
        templatePrompts={templatePrompts} 
        handleTemplateClick={handleTemplateClick} 
        sidebarWidth={sidebarWidth}
      />
      {isProfileOpen && <ProfileModal user={user} onClose={handleCloseProfile} />}
      {isSettingsOpen && <SettingsModal onClose={handleCloseSettings} />}
    </div>
  );
}

export default App1;
