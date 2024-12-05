import axios from "axios";
import { useState } from "react";

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getdata = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api", {
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

  const postlogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        new URLSearchParams({
          username: "admin",
          password: "admin",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Ensure the content is URL-encoded as Spring Security expects
          },
          withCredentials: true, // Make sure cookies are sent with the request (this is needed for session management)
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

  return (
    <div className="Home">
      <h1>Homeworks!</h1>
      <button onClick={getdata}>Fetch Data</button>
      <button onClick={postlogin}>Login</button>

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
