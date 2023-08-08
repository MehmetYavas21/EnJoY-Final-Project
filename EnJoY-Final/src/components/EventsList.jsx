import React from "react";
import { SimpleGrid, Box } from "@chakra-ui/layout";
import { EventInList } from "./ui/EventInList";

export const EventsList = ({
  matchedEvents,
  handleDeleteEvent,
  users,
  categories,
}) => {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      textAlign="center"
      rounded="lg"
      maxW="1224px"
      minH="80vh"
      pb="20"
    >
      {matchedEvents.map((event) => (
        <Box key={event.id} borderRadius="lg" p={4}>
          <EventInList
            event={event}
            users={users}
            categories={categories}
            handleDeleteEvent={handleDeleteEvent}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};
