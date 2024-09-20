import React from "react";

const ChatWindow = ({ messages, input, setInput, handleSubmit }) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="chat-window bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 h-[60vh] overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block p-2 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"}`}>
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
          className="flex-grow p-2 border border-gray-300 rounded-l-lg dark:border-gray-700 dark:bg-gray-700"
          placeholder="Ask anything..."
        />
        <button type="submit" className="p-2 text-white bg-blue-500 rounded-r-lg">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
