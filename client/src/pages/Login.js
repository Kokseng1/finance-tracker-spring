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
    <div className="LoginPage">
      <h1>Login</h1>

      <button onClick={postlogin}>Login</button>
      <div>
        <label>username </label>
        <input name="username" value={username} onChange={handleChange} />
      </div>
      <div>
        <label>password </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      {error && <p style={{ color: "red" }}>Error : {error}</p>}
    </div>
  );
}

export default LoginPage;
