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

const SideDrawer = () => {
  const navigate = useNavigate();
  const [isExpanded, setExpanded] = useState(false);
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <Box
      w={isExpanded ? "200px" : "50px"}
      h="100%"
      bg={"#191919"}
      color={"white"}
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
        color={"white"}
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

          <Button
            leftIcon={<Icon as={AiOutlineBell} fontSize={"20px"} />}
            variant="none"
          >
            {isExpanded && <Text>Notificatons</Text>}
          </Button>

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
