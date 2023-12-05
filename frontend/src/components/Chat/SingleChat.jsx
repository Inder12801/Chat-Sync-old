import React from "react";
import { ChatState } from "../../context/ChatProvider";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { IoChatbubbles } from "react-icons/io5";
import { AiOutlineArrowLeft, AiOutlineMenu } from "react-icons/ai";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { CiMenuKebab } from "react-icons/ci";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(selectedChat);
  const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Box
            w={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text
              fontSize="lg"
              fontFamily={"Poppins"}
              display={"flex"}
              alignItems={"center"}
              gap={"5px"}
            >
              <IconButton
                onClick={() => {
                  setSelectedChat(null);
                  setFetchAgain(!fetchAgain);
                }}
                icon={<AiOutlineArrowLeft />}
                variant="solid"
                borderRadius={"50%"}
                mr={"10px"}
              />
              {!selectedChat.isGroupChat ? (
                <>
                  {" "}
                  <Avatar
                    size={"sm"}
                    name={getSenderFull(user, selectedChat.users)?.name}
                    src={getSenderFull(user, selectedChat.users)?.pic}
                  />{" "}
                  {getSenderFull(user, selectedChat.users).name}
                </>
              ) : (
                <>
                  {" "}
                  <Avatar
                    size={"sm"}
                    name={getSenderFull(user, selectedChat.users)?.name}
                    src={getSenderFull(user, selectedChat.users)?.pic}
                  />
                  {selectedChat.chatName.toUpperCase()}
                </>
              )}
            </Text>
            {/* // write a menu with three dots iconButton on clicking of what a
            menu open which has an option of edit Group */}
            <Menu>
              <MenuButton
                p={0}
                as={Button}
                rightIcon={<CiMenuKebab />}
                borderRadius={"50%"}
                variant={"none"}
              />
              <MenuList>
                <MenuItem>
                  <Text onClick={onOpen}>Edit Group</Text>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Modal Title</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody></ModalBody>

                      <ModalFooter></ModalFooter>
                    </ModalContent>
                  </Modal>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </>
      ) : (
        <Box
          w={"100%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IoChatbubbles size={"40px"} color="#96f7fa" />

          <Text
            color={"#191919"}
            fontFamily={"Poppins"}
            fontSize={"x-large"}
            fontWeight={500}
            ml={2}
          >
            Select a chat to start.
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
