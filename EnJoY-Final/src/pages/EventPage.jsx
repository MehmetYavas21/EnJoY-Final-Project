import React from "react";
import { Text, Flex, Center, Button } from "@chakra-ui/react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { Event } from "../components/ui/Event";

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

export const EventPage = () => {
  const { event, users, categories } = useLoaderData();

  const navigate = useNavigate();

  const handleDeleteEvent = async () => {
    async function checkAnswer() {
      const answer = prompt(
        `are you sure you want to delete "${event.title}"`,
        'if you say "yes", it will be permenantly deleted!'
      );
      if (answer.toLowerCase() === "yes") {
        await fetch(`http://localhost:3000/events/${event.id}`, {
          method: "DELETE",
        }).then(() => {
          alert(`You deleted "${event.title}"`);
          navigate("/");
        });
      } else {
        alert(`you canceled to delete ${event.title}`);
        navigate("/event/:eventId");
      }
    }

    checkAnswer();
  };

  if (!event) {
    return (
      <Flex>
        <Loading />
        <Text>Just a moment...</Text>
      </Flex>
    );
  }

  return (
    <Center flexDir="column" alignItems="center">
      <Event users={users} event={event} categories={categories} />

      <Flex p={4} flexDir="row" justify="space-between" align="center">
        <Link to={`/event/edit/${event.id}`}>
          <Button style={{ background: "#319795", color: "white" }}>
            Edit
          </Button>
        </Link>
        <Button ml={2} onClick={handleDeleteEvent} colorScheme="red">
          Delete
        </Button>
      </Flex>
    </Center>
  );
};
