import { Heading, Text, Flex } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/image";
import { Link } from "react-router-dom";

export const Event = ({ event, categories, users }) => {
  const user = users?.find((user) => user.id == event?.createdBy);
  const category = categories?.find(
    (category) => category.id == event?.categoryIds
  );
  return (
    <Flex flexDir="column" alignItems="center">
      <Heading color="whatsapp.800" size={2} m={4}>
        <Link to={`/category/${category?.id}`}>Category: {category?.name}</Link>
      </Heading>
      <Heading p={10}>{event?.title}</Heading>
      <Img
        src={event?.image}
        alt={event?.title}
        borderRadius="10px"
        width="80%"
        shadow="xl"
      />
      <Flex alignItems="center">
        <img
          src={user?.image}
          alt={user?.name}
          width={40}
          style={{ borderRadius: "20px" }}
        />
        <Text p={5} fontWeight="bold">
          <Link to={`/user/${user?.id}`}>{user?.name}</Link>
        </Text>
        <Text>presents!</Text>
      </Flex>
      <Flex flexDir="column" align="center" p={10}>
        <Text p={2} fontSize="large" fontWeight="bold">
          {event.description}!
        </Text>
        <Text p={2}>Where? </Text>
        <Text fontWeight="bold">{event?.location}</Text>
        <Text p={2}>When?</Text>
        <Text fontWeight="bold">
          From {event?.startTime} to {event?.endTime}
        </Text>
      </Flex>
    </Flex>
  );
};
