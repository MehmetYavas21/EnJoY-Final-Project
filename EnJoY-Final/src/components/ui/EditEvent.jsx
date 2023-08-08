import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "./Button";
import { Input } from "@chakra-ui/react";

export const loader = async ({ params }) => {
  const event = await fetch(
    `http://localhost:3000/events/${params.eventId}`
  ).then((res) => res.json());

  const users = await fetch("http://localhost:3000/users").then((res) =>
    res.json()
  );

  const categories = await fetch("http://localhost:3000/categories").then(
    (res) => res.json()
  );

  return {
    event: event,
    users: users,
    categories: categories,
  };
};

export const EditEvent = () => {
  return (
    <Flex flexDir="column">
      <Text>You are editing the event </Text>
      <Text>change title</Text>
      <Input type="text" />
      <Button>Confirm</Button>
      <Button>Cancel</Button>
    </Flex>
  );
};
