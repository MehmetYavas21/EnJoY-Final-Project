import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Link } from "react-router-dom";
import { Button } from "./Button";

export const EventInList = ({
  users,
  event,
  categories,
  handleDeleteEvent,
}) => {
  const user = users.find(
    (user) => parseInt(user.id) === parseInt(event?.createdBy)
  );
  const category = categories.find(
    (cat) => parseInt(cat.id) === parseInt(event?.categoryIds)
  );

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" shadow="lg" bg="gray.100">
      <Link to={`/event/${event.id}`}>
        <Image
          src={event.image}
          alt={event.title}
          w="95%"
          h="200px"
          borderRadius={6}
          objectFit="cover"
          _hover={{
            opacity: 0.5,
            width: "100%",
            transition: "all, ease-in, 1s",
          }}
        />
      </Link>
      <Flex
        flexDir="column"
        align="center"
        _hover={{
          opacity: 0.8,
          padding: "10px",
          width: "100%",
          transition: "all, ease-in, 1s",
        }}
      >
        <Image
          src={user?.image}
          alt={user?.title}
          w="60px"
          h="60px"
          borderRadius="30px"
          mt="-30"
          objectFit="cover"
        />
        <Heading size="md" mt="2">
          {event.title}
        </Heading>
        <Text mt="1" fontSize="sm">
          {event.description}
        </Text>
        <Text>
          <Link to={`/category/${category?.id}`}>
            Category: {category?.name}
          </Link>
        </Text>
        <Text mt="2" fontSize="sm">
          Start Time: {event.startTime}
        </Text>
        <Text fontSize="sm">End Time: {event.endTime}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Button colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>
          Delete
        </Button>
        <Link to={`/event/edit/${event.id}`}>
          <Button>Edit</Button>
        </Link>
      </Flex>
    </Box>
  );
};
