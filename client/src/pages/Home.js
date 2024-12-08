import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import EditExpense from "../components/EditExpense";

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editedExpense, setEditedExpense] = useState(undefined);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    getCategories();
    getdata();
  }, []);

  const getCategories = () => {
    axiosInstance
      .get("http://localhost:8080/expense_category/allCategories", {
        withCredentials: true,
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "expenseName") {
      setExpenseName(value);
    }
    if (name == "amount") {
      setAmount(value);
    }
    if (name == "categoryName") {
      setCategoryName(value);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setError("");

    setIsSubmitting(true);
    const categoryAdded = categories.find((cat) => cat.name === categoryName);
    if (!categoryAdded) {
      setError("No such category!");
      setIsSubmitting(false);
      return;
    }
    const category_id = categoryAdded.id;

    const expenseDto = {
      amount: amount,
      name: expenseName,
      category_id: category_id,
    };

    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/expense/add",
        expenseDto,
        {
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: true,
        }
      );
      setAmount("");
      setCategoryName("");
      setExpenseName("");
      getdata();
    } catch (error) {
      console.log(error);
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

  const toggleEditModal = (expense) => {
    if (expense !== editedExpense) {
      setEditedExpense(expense);
      setShowEditModal(true);
    } else {
      setShowEditModal((s) => !s);
    }
  };

  const showEditForCurrentExpense = (expense) => {
    return showEditModal && editedExpense == expense;
  };

  const handleDelete = async (expense_id) => {
    try {
      const response = await axiosInstance.delete(
        `http://localhost:8080/expense/${expense_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      getdata();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Home">
      <h1>Expenses</h1>
      <div>
        <Link to="/expense_categories">Link to cats</Link>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>category</th>
            <th>amount</th>
            <th>date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td> {expense.categoryName}</td>
                <td> {expense.amount}</td>
                <td> {expense.createdDate}</td>
                <td>
                  <button onClick={() => toggleEditModal(expense)}>edit</button>
                  {showEditForCurrentExpense(expense) && (
                    <div>
                      showing edit modal
                      <EditExpense
                        expense={expense}
                        categories={categories}
                        onEditComplete={getdata}
                      />
                    </div>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(expense.id)}>
                    delete
                  </button>
                </td>
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
          {isSubmitting ? "Adding expense..." : "Add expense"}
        </button>
      </form>
    </div>
  );
}

export default Home;
