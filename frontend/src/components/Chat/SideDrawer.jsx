// SideDrawer.js
import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
  IconButton,
  flexbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  AiOutlineHome,
  AiOutlineBell,
  AiOutlineSend,
  AiOutlineEllipsis,
  AiOutlineSetting,
  AiOutlineMenu,
  AiOutlineLogout,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import { Badge } from "@mui/material";

const SideDrawer = () => {
  const navigate = useNavigate();
  const [isExpanded, setExpanded] = useState(false);
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const { notifications, setNotifications, user, setSelectedChat } =
    ChatState();

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };

  return (
    <Box
      w={isExpanded ? "200px" : "50px"}
      h="100%"
      bg={"#ebe5e5"}
      // bg={"#191919"}
      // color={"white"}
      p={4}
      boxShadow="md"
      transition="width 0.3s"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      borderRadius={"20px 0 0 20px"}
      className="div-shadow"
    >
      <IconButton
        icon={<Icon as={AiOutlineMenu} />}
        onClick={handleToggle}
        variant="none"
        fontSize="xl"
        mb={4}
        // color={"white"}
      />

      <VStack height={"100%"} justifyContent={"space-between"}>
        <VStack
          height={"50%"}
          spacing={6}
          align="stretch"
          justifyContent={"space-evenly"}
        >
          <Button
            leftIcon={<Icon as={AiOutlineHome} fontSize={"20px"} />}
            variant="none"
          >
            {isExpanded && <Text>Home</Text>}
          </Button>

          <Menu>
            <MenuButton>
              <Button
                leftIcon={
                  <Icon
                    as={AiOutlineBell}
                    color={notifications.length > 0 ? "red" : "black"}
                    fontSize={"20px"}
                  />
                }
                variant="none"
              >
                {isExpanded && <Text>Notificatons</Text>}
              </Button>
            </MenuButton>
            <MenuList bg={"#ebe5e5"}>
              {/* <MenuItem>
                <Text>Notification 1</Text>
              </MenuItem> */}
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <MenuItem
                    bg={"#ebe5e5"}
                    key={notification._id}
                    mt={2}
                    onClick={() => {
                      setSelectedChat(notification.chat);
                      setNotifications(
                        notifications.filter(
                          (noti) => noti._id !== notification._id
                        )
                      );
                    }}
                  >
                    <Text bg={"#ebe5e5"}>
                      {notification.chat.isGroupChat
                        ? `New message in ${notification.chat.chatName}`
                        : `New message from ${getSender(
                            user,
                            notification.chat.users
                          )}`}
                    </Text>
                  </MenuItem>
                ))
              ) : (
                <MenuItem bg={"#ebe5e5"}>
                  <Text bg={"#ebe5e5"}>No notifications</Text>
                </MenuItem>
              )}
            </MenuList>
          </Menu>

          <Button
            leftIcon={<Icon as={AiOutlineSend} fontSize={"20px"} />}
            variant="none"
          >
            {isExpanded && <Text>Chats</Text>}
          </Button>

          <Button
            leftIcon={<Icon as={AiOutlineSetting} fontSize={"20px"} />}
            variant="none"
          >
            {isExpanded && <Text>Options</Text>}
          </Button>
        </VStack>

        <Button
          leftIcon={<Icon as={AiOutlineLogout} fontSize={"20px"} />}
          variant="none"
          onClick={logoutHandler}
        >
          {isExpanded && <Text>Logout</Text>}
        </Button>
      </VStack>
    </Box>
  );
};

export default SideDrawer;
