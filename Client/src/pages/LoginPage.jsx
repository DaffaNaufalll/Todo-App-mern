import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/service/user/signin", formData);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/todos");
      window.location.reload();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0ffe0 0%, #f8fff8 100%)",
      display: "flex",
      flexDirection: "column"
    }}>
      <header style={{
        background: "linear-gradient(90deg, #4ade80 0%, #22d3ee 100%)",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
      }}>
        <div style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#065f46" }}>
          <span role="img" aria-label="logo">📝</span> ToDoSome
        </div>
      </header>
      <main style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <form onSubmit={handleSubmit} style={{
          background: "#fff",
          padding: "2rem 2.5rem",
          borderRadius: 12,
          boxShadow: "0 2px 16px #0001",
          minWidth: 320
        }}>
          <h2 style={{ textAlign: "center", marginBottom: 24, color: "#059669" }}>Please login!</h2>
          <div style={{ marginBottom: 16 }}>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 6,
                border: "1px solid #d1fae5",
                marginBottom: 12,
                fontSize: 16
              }}
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 6,
                border: "1px solid #d1fae5",
                fontSize: 16
              }}
            />
          </div>
          {error && (
            <div style={{ color: "red", marginBottom: 12, textAlign: "center" }}>{error}</div>
          )}
          <button type="submit" style={{
            width: "100%",
            background: "#059669",
            color: "#fff",
            padding: "0.75rem",
            border: "none",
            borderRadius: 6,
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer"
          }}>
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;