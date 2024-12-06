import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getdata = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:8080/api", {
        withCredentials: true,
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="Home">
      <h1>Homeworks!</h1>
      <button onClick={getdata}>Fetch Data</button>

      {/* Render HTML content */}
      {data && (
        <div
          dangerouslySetInnerHTML={{ __html: data }}
          style={{ border: "1px solid #ccc", padding: "10px" }}
        ></div>
      )}

      {/* Render error message */}
      {error && <p style={{ color: "red" }}>Error from backend: {error}</p>}
    </div>
  );
}

export default Home;
