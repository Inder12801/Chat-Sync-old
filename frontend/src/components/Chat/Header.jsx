import React from "react";
import SearchDrawer from "./SearchDrawer";
import {
  Avatar,
  Box,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";

const Header = () => {
  const { user } = ChatState();
  return (
    <Box
      display={"flex"}
      w={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bgColor={"white"}
      p={"4px 10px"}
      borderRadius={"0px 20px 0 0px"}
      className="div-shadow"
    >
      <SearchDrawer />
      <Box>
        <Text>ChatSync</Text>
      </Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Avatar size={"sm"} name={user?.name} src={user?.pic} />}
          variant="outline"
          rightIcon={<ChevronDownIcon />}
        />
        <MenuList>
          <ProfileModal user={user}>
            <MenuItem display={"flex"} textAlign={"center"}>
              Profile
            </MenuItem>
          </ProfileModal>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Header;
