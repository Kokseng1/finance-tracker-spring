import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import EditExpenseCategory from "../components/EditExpenseCategory";

const ExpenseCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    axiosInstance
      .get("http://localhost:8080/expense_category/allCategories", {
        withCredentials: true,
      })
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching data");
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  const categoryIsEdited = (category_id) => {
    return showEditModal && editingId == category_id;
  };

  const toggleEditmodal = (category) => {
    if (editingId == category.id) {
      setShowEditModal((s) => !s);
    } else {
      setShowEditModal(true);
      setEditingId(category.id);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/expense_category/add",
        {
          name: newCatName,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status == 201) {
        setNewCatName("");
        getCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "newCatName") {
      setNewCatName(value);
    }
  };

  const handleDelete = async (category_id) => {
    try {
      await axiosInstance.delete(
        `http://localhost:8080/expense_category/${category_id}`,
        { withCredentials: true }
      );
      getCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div>
      <h1>Expense Categories</h1>
      <input
        placeholder="new cat name"
        name="newCatName"
        value={newCatName}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAdd}>Add cat</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => toggleEditmodal(category)}>edit</button>
                {categoryIsEdited(category.id) && (
                  <div>
                    <EditExpenseCategory
                      category={category}
                      onEditComplete={getCategories}
                    />
                  </div>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(category.id)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseCategories;
