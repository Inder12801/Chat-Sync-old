import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={"4"}>
      <Spinner size="xl" color="blue.500" />
    </Box>
  );
};

export default Loader;
