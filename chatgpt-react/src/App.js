import React, {useState, useEffect} from "react"
import axios from "axios"

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false)

  const fetchResponse = async (userMessage) => {
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
            Authorization: `Bearer ${apiKey}`
          }
        }
      )
      console.log("API Key:", apiKey);


      const botMessage = response.data.choices[0].text.trim();
      setMessages((prevMessages) => [
        ...prevMessages,
        {sender: "user", text: userMessage},
        {sender: "bot", text: botMessage},
      ])
    } catch (error) {
      console.error("Error fetching GPT response:", error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(input.trim()) {
      fetchResponse(input.trim())
      setInput("")
    }
  }

  useEffect(() => {
    if(isDarkMode) {
      document.documentElement.classList.add("add")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])



  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"} p-4`}>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-bold'>ChatGPT Clone</h1>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className='bg-gray-200 dark:bg-gray-700 p-2 rounded-md'>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className='chat-window bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 h-[60vh] overflow-y-auto'>
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block p-2 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-grow p-2 rounded-l-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700" placeholder="Message ChatGPT" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
      </form>
    </div>
  );
}

export default App;
