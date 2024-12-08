import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import EditExpense from "../components/EditExpense";

function Home() {
  const [expenses, setExpenses] = useState(null);
  const [error, setError] = useState(null);
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editedExpense, setEditedExpense] = useState(undefined);
  const [showEditModal, setShowEditModal] = useState(false);
  const [totalPages, setTotalPages] = useState(undefined);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState("createdDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchedName, setSearchedName] = useState("");
  let debounceTimeout;

  useEffect(() => {
    getCategories();
    getAllExpenses();
  }, []);

  const handleNext = () => {
    if (pageNumber < totalPages - 1) {
      getAllExpenses(pageNumber + 1);
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevious = () => {
    if (pageNumber > 0) {
      getAllExpenses(pageNumber - 1);
      setPageNumber(pageNumber - 1);
    }
  };

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
      getAllExpenses();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAllExpenses = async (
    page = pageNumber,
    pageSizeInput = pageSize,
    sortByInput = sortBy,
    sortDirectionInput = sortDirection,
    nameInput = searchedName
  ) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:8080/expense/allExpenses?page=${page}&size=${pageSizeInput}&sortBy=${sortByInput}&direction=${sortDirectionInput}&name=${nameInput}`,
        {
          withCredentials: true,
        }
      );
      const { content, totalPages } = response.data;
      setExpenses(content);
      setTotalPages(totalPages);
      setError(null);
    } catch (error) {
      setError(error.message);
      setExpenses(null);
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

      getAllExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
    getAllExpenses(pageNumber, e.target.value);
  };

  const changeSort = (e) => {
    const target = e.target.id;
    if (sortBy !== target) {
      setSortBy(target);
      getAllExpenses(pageNumber, pageSize, e.target.id);
    } else {
      const newDir = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newDir);
      getAllExpenses(pageNumber, pageSize, sortBy, newDir);
    }
  };

  const handleSearchNameChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchedName(value);

      clearTimeout(debounceTimeout);

      debounceTimeout = setTimeout(() => {
        getAllExpenses(pageNumber, pageSize, sortBy, sortDirection, value);
      }, 500);
    },
    [pageNumber, pageSize, sortBy, sortDirection]
  );

  return (
    <div className="Home">
      <h1>Expenses</h1>
      <div>
        <Link to="/expense_categories">Link to cats</Link>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <select
        id="dropdown"
        value={pageSize}
        placeholder="page size"
        onChange={handlePageSizeChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <input
        value={searchedName}
        placeholder="search by name"
        onChange={handleSearchNameChange}
      />
      <table>
        <thead>
          <tr>
            {["name", "category", "amount", "date"].map((column) => (
              <th
                id={column === "date" ? "createdDate" : column}
                key={column}
                onClick={changeSort}
              >
                {column}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses &&
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>
                  <Link to={`/expense_categories/${expense.category_id}`}>
                    {expense.categoryName}
                  </Link>
                </td>
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
                        onEditComplete={getAllExpenses}
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
      </form>{" "}
      <div>
        <button onClick={handlePrevious} disabled={pageNumber === 0}>
          Previous
        </button>
        <span>
          Page {pageNumber + 1} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={pageNumber >= totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
