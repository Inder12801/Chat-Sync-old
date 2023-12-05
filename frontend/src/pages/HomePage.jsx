import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        bgColor={"white"}
        justifyContent={"center"}
        p={"3"}
        borderRadius={"15px"}
        margin={"40px 0 20px  0"}
        width={"100%"}
        className="div-shadow "
      >
        <Text
          fontSize={"x-large"}
          fontWeight={"500"}
          textTransform={"uppercase"}
        >
          ChatSync
        </Text>
      </Box>
      <Box
        w={"100%"}
        bgColor={"white"}
        p={"3"}
        borderRadius={"15px"}
        className="div-shadow "
      >
        <Tabs isFitted variant={"soft-rounded"}>
          <TabList mb={"10px"}>
            <Tab
              _selected={{ color: "black", bg: "#b5d6e5" }}
              width={"50%"}
              m={"0 10px"}
              className="hover-effect"
            >
              Login
            </Tab>
            <Tab
              _selected={{ color: "black", bg: "#b5d6e5" }}
              w={"50%"}
              m={"0 10px"}
              className="hover-effect"
            >
              Signup
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
