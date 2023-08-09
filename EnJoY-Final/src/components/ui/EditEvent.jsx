import { Flex, Heading } from "@chakra-ui/layout";
import { Button } from "./Button";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate, Form } from "react-router-dom";
import { CategoryFilter } from "../CategoryFilter";

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
  const { categories, event } = useLoaderData();

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [createdBy, setCreatedBy] = useState([event.createdBy]);
  const [categoryIds, setCategoryIds] = useState([event.categoryIds]);
  const [location, setLocation] = useState(event.location);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [image, setImage] = useState(event.image);

  const handleFilter = (selectedCategory) => {
    if (!selectedCategory) {
      setCategoryIds("");
      return;
    }

    const categoryId = parseInt(selectedCategory);

    setCategoryIds(categoryId);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("createdBy", createdBy);
    formData.append("categoryIds", categoryIds);
    formData.append("location", location);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);

    try {
      const resp = await axios
        .put("http://localhost:3000/events/" + event.id, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(
          alert(`
        Event has been edited succesfully!
        You're going to be redirected to the Homepage!`)
        )
        .then(navigate("/"));

      setTitle("");
      setDescription("");
      setCreatedBy([]);
      setCategoryIds([]);
      setLocation("");
      setStartTime("");
      setEndTime("");
      setImage("");
      return resp;
    } catch (error) {
      console.error("Failed to create event.");
    }
  };
  return (
    <Flex flexDir="column" align="center">
      <Heading p={4} color="gray.600">
        Edit "{event.title}"
      </Heading>

      <Flex
        p={4}
        w="auto"
        borderRadius={10}
        shadow="2xl"
        backgroundColor="gray.100"
      >
        <Form onSubmit={handleSubmit} m="auto">
          <Flex flexDir="column" justifySelf="center" gap={4}>
            <label>
              <span>Edit Title :</span>
              <Input
                type="text"
                placeholder="Event title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <span>Edit event foto url</span>
              <div>
                <Input
                  type="url"
                  placeholder="edit URL"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </label>

            <label>
              <span>Edit Description :</span>
              <Input
                type="text"
                placeholder="Edit description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              <span>Change Category :</span>

              <CategoryFilter
                categories={categories}
                handleFilter={handleFilter}
              />
            </label>
            <label>
              <span>Second Category (optional):</span>

              <CategoryFilter
                categories={categories}
                handleFilter={handleFilter}
              />
            </label>
            <label>
              <span>Edit location :</span>
              <Input
                type="text"
                placeholder="Change place"
                name="createdBy"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>

            <label>
              <span>Edit Date and Time</span>
              <Input
                type="text"
                placeholder="Start Time"
                name="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <br />
              <br />
              <Input
                type="text"
                placeholder="End Time"
                name="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </label>
            <Button type="submit" width={100} borderRadius={10}>
              Edit
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};
