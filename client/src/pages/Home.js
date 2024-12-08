import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState(undefined);
  const [categoryId, setCategoryId] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryError, setCategoryError] = useState("");
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/expense_category/allCategories",
        {
          withCredentials: true,
        }
      );

      setCategories(response.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    if (name == "expenseName") {
      setExpenseName(value);
    }
    if (name == "amount") {
      setAmount(value);
    }
    if (name == "categoryId") {
      setCategoryId(value);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setError("");
    // if (!validateForm()) return;

    setIsSubmitting(true);

    const expenseDto = {
      amount: amount,
      name: expenseName,
      category_id: categoryId,
    };

    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/expense/add",
        expenseDto,
        // new URLSearchParams(expenseData),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: true,
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        // setError(errorMessage);
        console.log(errorMessage);
      } else {
        if (response.status === 201) {
          alert("expense added successfully!");
        }
      }
    } catch (error) {
      console.log(error);
      // setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getdata = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/expense/allExpenses",
        {
          withCredentials: true,
        }
      );
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
      console.error("Error fetching data:", error);
    }
  };

  const clickTestButton = async () => {
    try {
      const response = await axiosInstance.delete(
        "http://localhost:8080/expense/4",
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Home">
      <h1>Homeworks!</h1>
      <button onClick={getdata}>Fetch Data</button>
      {error && <p style={{ color: "red" }}>Error from backend: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>category</th>
            <th>amount</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((expense) => (
              <tr>
                <td>{expense.name}</td>
                <td> {expense.categoryName}</td>
                <td> {expense.amount}</td>
                <td> {expense.createdDate}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <form
        onSubmit={handleAddExpense}
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
            name="expenseName"
            placeholder="expense name"
            value={expenseName}
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
        </div>{" "}
        <div>
          <input
            type="number"
            name="categoryId"
            placeholder="cat id"
            value={categoryId}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          style={{ width: "100px" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding expense..." : "Add expense"}
        </button>
      </form>
      <button onClick={getCategories}>Fetch cates</button>
      <div>
        {categories && (
          <table>
            <thead>
              <tr>
                <th>category name</th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((category, index) => (
                  <tr key={index}>
                    <td>{category.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      {categoryError && (
        <p style={{ color: "red" }}>Error from backend: {categoryError}</p>
      )}
      <button onClick={clickTestButton}>test button</button>
    </div>
  );
}

export default Home;
