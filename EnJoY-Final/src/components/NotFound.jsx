import { Flex, Heading, Img } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";

export const NotFound = () => {
  return (
    <Flex flexDir="column" align="center" p="25%">
      <Heading>SORRY!</Heading>
      <p>The page doesnt exist!..</p>
      <Img
        src="https://cdn-icons-png.flaticon.com/512/1670/1670189.png"
        alt="stop"
      />
      <Link to={"/"}>
        <Button>Back to homepage...</Button>
      </Link>
    </Flex>
  );
};
