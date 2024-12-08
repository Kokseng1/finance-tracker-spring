import axios from "axios";
import { useState } from "react";

function LoginPage() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const postlogin = async () => {
    const data = new URLSearchParams({
      username: username,
      password: password,
    });
    try {
      const response = await axios
        .post("http://localhost:8080/login", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.message);
          if (res.status == 200) {
            window.location.href = "/";
          }
        });
    } catch (error) {
      setError(error.response.data);

      console.error("Error fetching data:", error.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  return (
    <div
      className="LoginPage "
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="login-card"
        style={{
          // FontFace: "Poppins", sans-serif,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          //   gap: 0.7rem;
          padding: "1.5rem",
          width: "18rem",
          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 25%)",
        }}
      >
        <h1>Login</h1>
        <div style={{ padding: "3px" }}>
          <input
            name="username"
            placeholder="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div style={{ padding: "3px" }}>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
        </div>{" "}
        <div style={{ padding: "6px" }}>
          <button onClick={postlogin}>Login</button>
        </div>
        {error && <p style={{ color: "red" }}>Error : {error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
