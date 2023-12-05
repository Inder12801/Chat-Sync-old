import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const ProfileModal = ({ user, children }) => {
  console.log(children);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box display={"flex"} justifyContent={"center"} onClick={onOpen} p={0}>
        {children}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>{user?.name}</ModalHeader>
          <ModalCloseButton color={"red"} />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={"20px"}
          >
            <Image
              bgColor={"white"}
              src={user?.pic}
              alt={user?.name}
              width={"140px"}
              height={"140px"}
              borderRadius={"50%"}
              objectFit={"contain"}
              border={"5px solid #fe50ff"}
            />

            <Text fontSize={"x-large"}>Email : {user?.email}</Text>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
