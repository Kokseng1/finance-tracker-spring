import React, { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Validate form data
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    if (!validateForm()) return;

    setIsSubmitting(true);

    const userData = new URLSearchParams();
    userData.append("username", username);
    userData.append("password", password);
    userData.append("confirmPassword", confirmPassword);

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: new URLSearchParams(userData), // Send the data as form-urlencoded
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Correct content type
        },
      });

      // Check if the response status is not OK (error response)
      if (!response.ok) {
        const errorMessage = await response.text(); // Extract the message from the response body
        setError(errorMessage); // Set the error message from the response
        console.log(errorMessage); // Log the error message for debugging
      } else {
        // If the response status is OK, proceed with successful registration
        if (response.status === 201) {
          alert("User registered successfully!");
          window.location.href = "/"; // Redirect to the home page or login page
        }
      }
    } catch (error) {
      console.log(error);
      setError(error); // Catch any network or JavaScript error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
