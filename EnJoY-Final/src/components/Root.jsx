import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { MyFooter } from "./Footer";

export const Root = () => {
  return (
    <Box backgroundColor="gray.50" height="100%" maxWidth="1024px" m="auto">
      <Navigation />
      <Outlet />
      <MyFooter />
    </Box>
  );
};
