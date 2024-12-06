import React, { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const validateForm = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (!username || !password) {
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setIsSubmitting(true);

    const userData = new URLSearchParams();
    userData.append("username", username);
    userData.append("password", password);
    userData.append("confirmPassword", confirmPassword);

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: new URLSearchParams(userData),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.log(errorMessage);
      } else {
        if (response.status === 201) {
          alert("User registered successfully!");
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="register-page"
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
      }}
    >
      {" "}
      <div
        className="register-card"
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
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
              name="username"
              placeholder="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            style={{ width: "100px" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
