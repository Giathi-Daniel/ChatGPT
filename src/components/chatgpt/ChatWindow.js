import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/config"; 
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import axios from "axios";

const ChatWindow = ({ user, showWelcomeMessage, templatePrompts, handleTemplateClick, sidebarWidth }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedChat, setSelectedChat] = useState(null); 
  const [chatLimit, setChatLimit] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchChats = async () => {
      const chatData = await getDocs(collection(db, "chats"));
      const chatMessages = chatData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(chatMessages);
    };
    fetchChats();
  }, []);

  const getChatTitleFromAPI = async (input) => {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",  
      messages: [
        { role: "user", content: `Suggest a suitable title for the chat based on this message: "${input}"` }
      ],
      max_tokens: 10,
    }, {
      headers: {
        'Authorization': `Bearer OPENAI_API_KEY`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.choices[0].message.content.trim(); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedChat) {
      const chatRef = doc(db, "chats", selectedChat.id);
      const updatedMessages = [...selectedChat.messages, { sender: "user", text: input }];
      if (updatedMessages.length <= 100) {
        await updateDoc(chatRef, { messages: updatedMessages });
        setMessages(updatedMessages);
      } else {
        setChatLimit(true);
      }
    } else {
      const title = await getChatTitleFromAPI(input); 
      const newChat = {
        messages: [{ sender: "user", text: input }],
        title: title 
      };
      await addDoc(collection(db, "chats"), newChat);
      setMessages(newChat.messages);
    }
    setInput("");
  };

  const handleDeleteChat = async (chatId) => {
    await deleteDoc(doc(db, "chats", chatId));
    setSelectedChat(null);
    setMessages([]);
  };

  return (
    <div className="flex-1 flex flex-col bg-[rgb(33,33,33)] relative">
      <div className="flex-1 overflow-y-auto mb-16 pr-4">
        {showWelcomeMessage && (
          <div className="p-3 bg-gray-300 text-black rounded-lg m-4 flex flex-col text-center w-[40rem]">
            <p>Welcome to your chat! Feel free to ask anything.</p>
            <div className="flex flex-wrap gap-2 justify-center items-center mt-5">
              {templatePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleTemplateClick(prompt)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg m-1"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`flex items-start mb-4 ${message.sender === "user" ? "justify-end mt-6" : "justify-start ml-5"}`}>
            {message.sender === "user" && user && <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-2" />}
            <div className={`p-3 rounded-lg ${message.sender === "user" ? "bg-[#1b1818] text-[#F0F0F0]" : "bg-[rgb(59,95,113)] text-white"}`}>
              {message.text}
            </div>
          </div>
        ))}

        <div ref={chatEndRef} />

        {chatLimit && <div className="p-3 bg-red-500 text-white">Chat memory full! Please delete old messages.</div>}
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 translate-x-[32%] w-[calc(100%-320px)] p-4 bg-[rgb(33,33,33)] flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border rounded-lg p-2 bg-[#1b1818] text-white"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 ml-2">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
