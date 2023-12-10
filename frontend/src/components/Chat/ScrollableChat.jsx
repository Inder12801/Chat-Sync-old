import React from "react";
import { Flex, Box, Avatar, Text } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import moment from "moment";

const ScrollableChat = ({ messages, loggedInUser }) => {
  return (
    <>
      {messages.map((message, index) => (
        <Box
          key={index}
          display={"flex"}
          flexDirection={
            message.sender._id === loggedInUser._id ? "row-reverse" : "row"
          }
          align="center"
          mb={2}
        >
          {message.sender._id !== loggedInUser._id && (
            <Avatar
              src={message.sender.pic}
              alt={`${message.sender.name}'s avatar`}
              mr={2}
              ml={2}
              size="sm"
            />
          )}

          <Box
            maxW="40%"
            bg={
              message.sender._id === loggedInUser._id ? "cyan.500" : "gray.400"
            }
            color={message.sender._id === loggedInUser._id ? "white" : "black"}
            p={3}
            borderRadius="20px"
          >
            <Text fontSize="xs" color={"black"}>
              {message.content}
            </Text>
            <Text fontSize="xx-small" color={"black"} textAlign="right" mt={1}>
              {moment(message.createdAt).format("LT")}
            </Text>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default ScrollableChat;
