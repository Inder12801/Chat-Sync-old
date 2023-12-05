import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const value = {
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  };

  // Get the current logged in user. If there is no user, redirect to login page.
  const checkUser = async () => {
    const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
      return;
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
