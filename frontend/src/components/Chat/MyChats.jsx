import React, { useEffect, useState } from "react";
import SearchDrawer from "./SearchDrawer";
import { ChatState } from "../../context/ChatProvider";
import { Box, Button, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "../GroupChat/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const toast = useToast();
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("userInfo") || {})
  );

  // setUser(JSON.parse(localStorage.getItem("userInfo")));
  // Get logged user info
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedUser?.token}`,
    },
  };

  const fetchChats = async () => {
    try {
      // const token = await user?.token;
      let res = await axios.get("/api/chat", config);
      setChats(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={["none", "flex"]}
      flexDir={"column"}
      alignItems={"center"}
      bgColor={"white"}
      className="div-shadow"
      w={["100%", "30%"]}
      p={3}
      height={"97%"}
      m={2}
      borderRadius={"20px"}
      flex={1}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w={"100%"}
        mb={"15px"}
      >
        <Text fontSize={"1.3em"} fontWeight={"500"}>
          My Chats
        </Text>
        <GroupChatModal>
          <Button leftIcon={<AddIcon />} fontSize={"0.8em"}>
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <>
        {chats ? (
          <Stack
            width={"100%"}
            overflow={"scroll"}
            display={"flex"}
            flexDirection={"column"}
            height={"100%"}
          >
            {chats.map((chat, index) => {
              return (
                <Box
                  onClick={() =>
                    setSelectedChat(selectedChat === chat ? null : chat)
                  }
                  cursor={"pointer"}
                  bg={selectedChat === chat ? "#86cbea" : "#e1e1e1"}
                  color={selectedChat === chat ? "white" : "black"}
                  key={chat._id}
                  // className="div-shadow"
                  width={"100%"}
                  p={"10px"}
                  borderRadius={"20px"}
                  className={selectedChat === chat ? "" : "hover-effect"}
                >
                  {!chat.isGroupChat ? (
                    <Text
                      fontFamily={"Poppins"}
                      fontWeight={"500"}
                      fontSize={"1.1em"}
                    >
                      {getSender(loggedUser, chat.users)}
                    </Text>
                  ) : (
                    <Text
                      fontFamily={"Poppins"}
                      fontWeight={"500"}
                      fontSize={"1.1em"}
                    >
                      {chat.chatName}
                    </Text>
                  )}
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </>
    </Box>
  );
};

export default MyChats;
