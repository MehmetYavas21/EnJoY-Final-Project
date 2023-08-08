import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const MyFooter = () => {
  return (
    <Box bg="blackAlpha.700" color="whiteAlpha.700" p={4} textAlign="center">
      <Text>
        <Link to="/">About Us</Link>
      </Text>
      <Text>
        <Link to="/">Contact</Link>
      </Text>
      <Text>&copy; {new Date().getFullYear()} EnJoY. All rights reserved.</Text>
    </Box>
  );
};
