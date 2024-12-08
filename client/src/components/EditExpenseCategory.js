import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const EditExpenseCategory = ({ category, onEditComplete }) => {
  const [name, setName] = useState(category.name);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setName(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    console.log("submitting");
    try {
      const response = await axiosInstance.put(
        `http://localhost:8080/expense_category/${category.id}`,
        {
          name: name,
        },
        {
          withCredentials: true,
        }
      );

      onEditComplete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="new name"
      ></input>
      <button onClick={handleSubmit}>Edit</button>
    </div>
  );
};

export default EditExpenseCategory;
