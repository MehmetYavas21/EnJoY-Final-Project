import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Flex, Heading, Input } from "@chakra-ui/react";
import { Button } from "./ui/Button";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { CategoryFilter } from "./CategoryFilter";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    events: await events.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventUserForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState("");
  Array.isArray(categoryIds);

  const { categories, users } = useLoaderData();

  const handleFilter = (selectedCategory) => {
    if (!selectedCategory) {
      setCategoryIds([]);
      return;
    }

    const categoryId = parseInt(selectedCategory);

    setCategoryIds([categoryId]);
  };

  const handleFilterUser = (selectedUser) => {
    if (!selectedUser) {
      setCreatedBy();
      return;
    }

    const userId = parseInt(selectedUser);

    setCreatedBy(userId);
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
        .post("http://localhost:3000/events/", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(
          alert(`
        Event has been created succesfully!
        You're going to be redirected to the Homepage!`)
        )
        .then(navigate("/"));

      setTitle("");
      setDescription("");
      setCategoryIds([]);
      setCreatedBy([]);
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
        Create Your Own Event
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
              <span>What do you organize? :</span>
              <Input
                type="text"
                placeholder="Event title"
                name="title"
                value={title}
                required="required"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <span>Please add an image :</span>
              <div>
                <Input
                  type="url"
                  placeholder="Give a nice picture's url"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                {/* Our server doesn't accept to upload an image/file, therefore below codeblock would not work!
              {image && (
                <div>
                  <Image
                    alt="not found"
                    width={"200px"}
                    src={URL.createObjectURL(image)}
                    value={image}
                  />
                  <br />
                  <Button onClick={() => setImage(null)}>Remove</Button>
                </div>
              )}

              <br />
              <br />

              <Input
                type="file"
                name="image"
                // value={image}
                onChange={(imgEvent) => {
                  setImage(imgEvent.target.files[0]);
                }}
              /> */}
              </div>
            </label>
            <label>
              <span>Who is organizing? :</span>

              <CategoryFilter
                categories={users}
                handleFilter={handleFilterUser}
              />
            </label>
            <label>
              <span>Description :</span>
              <Input
                type="text"
                placeholder="Give a small description"
                name="description"
                value={description}
                required="required"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              <span>Category :</span>
              <CategoryFilter
                categories={categories}
                handleFilter={handleFilter}
              />
            </label>
            <label>
              <span>Second Category (optional) :</span>

              <CategoryFilter
                categories={categories}
                handleFilter={handleFilter}
              />
            </label>
            <label>
              <span>Location :</span>
              <Input
                type="text"
                placeholder="Name"
                name="createdBy"
                value={location}
                required="required"
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>

            <label>
              <span>When :</span>
              <Input
                type="text"
                placeholder="Start Time"
                name="startTime"
                value={startTime}
                required="required"
                onChange={(e) => setStartTime(e.target.value)}
              />
              <br />
              <br />
              <Input
                type="text"
                placeholder="End Time"
                name="endTime"
                value={endTime}
                required="required"
                onChange={(e) => setEndTime(e.target.value)}
              />
            </label>
            <Button type="submit" width={100} borderRadius={10}>
              Submit
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};
