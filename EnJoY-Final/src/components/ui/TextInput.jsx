import { Input } from "@chakra-ui/react";

export const TextInput = ({ changeFn }) => (
  <Input
    onChange={changeFn}
    variant="flushed"
    color="blue.300"
    fontSize="larger"
    fontWeight="bold"
    placeholder="type to search..."
    size={["sm", "md", "lg"]}
    _placeholder={{ opacity: 0.8, color: "blue.200", fontWeight: "normal" }}
    width="auto"
  />
);
