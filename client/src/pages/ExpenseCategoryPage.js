import { useParams } from "react-router-dom";

const ExpenseCategoryPage = () => {
  const { id } = useParams(); // Extracts the path variable
  return (
    <div>
      <h1>Category Page</h1>
      <p>Category ID: {id}</p>
    </div>
  );
};

export default ExpenseCategoryPage;
