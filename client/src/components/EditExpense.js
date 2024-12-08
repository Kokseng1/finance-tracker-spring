import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const EditExpense = ({ expense, onEditComplete, categories }) => {
  const [name, setName] = useState(expense.name);
  const [categoryName, setCategoryName] = useState(expense.categoryName);
  const [amount, setAmount] = useState(expense.amount);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "amount") {
      setAmount(value);
    } else if (name === "categoryName") {
      setCategoryName(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryAdded = categories.find((cat) => cat.name === categoryName);
    if (!categoryAdded) {
      setErrorMsg("Invalid category");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axiosInstance.put(
        `http://localhost:8080/expense/${expense.id}`,
        {
          name: name,
          category_id: categoryAdded.id,
          amount: amount,
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
      <form
        onSubmit={handleSubmit}
        style={{
          height: "150px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="expense name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="amount"
            placeholder="amount"
            value={amount}
            onChange={handleChange}
            required
          />
        </div>
        <input
          list="category-options"
          name="categoryName"
          value={categoryName}
          onChange={handleChange}
          placeholder="Select or type a category"
          required
        />
        <datalist id="category-options">
          {categories &&
            categories.map((category) => (
              <option key={category.id}>{category.name}</option>
            ))}
        </datalist>
        <button
          type="submit"
          style={{ width: "100px" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "editing expense..." : "edit expense"}
        </button>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </form>
    </div>
  );
};

export default EditExpense;
