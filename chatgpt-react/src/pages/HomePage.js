import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatBox from "../components/ChatBox";
import FreeChatCounter from "../components/FreeChatCounter";
import LoginModal from "../components/LoginModal";

const Home = () => {
  const { currentUser } = useAuth();
  const [freeChats, setFreeChats] = useState(3);

  const handleSendMessage = () => {
    if (freeChats > 0) {
      setFreeChats(freeChats - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to ChatGPT Clone</h1>
      {!currentUser && freeChats <= 0 ? (
        <LoginModal />
      ) : (
        <>
          <FreeChatCounter count={freeChats} />
          <ChatBox onSendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default Home;
