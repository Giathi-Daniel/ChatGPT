import React, { useState } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const ChatBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState("")

  const handleSend = async () => {
    if(message.trim()) {
      await addDoc(collection(db, "messages"), {
        text: message,
        createdAt: new Date()
      })
      setMessage("")
      onSendMessage()
    }
  }

  return (
    <div>
      <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow p-2 rounded-l-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700"
            placeholder="Message ChatGPT..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Send
          </button>
    </div>
  )
}

export default ChatBox