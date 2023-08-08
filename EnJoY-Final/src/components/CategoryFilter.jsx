import { Select } from "@chakra-ui/react";

export const CategoryFilter = ({ categories, handleFilter }) => {
  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    handleFilter(selectedCategory);
  };

  return (
    <Select onChange={handleChange}>
      <option value="">Select</option>
      {categories?.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};
