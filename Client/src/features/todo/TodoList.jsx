import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodo, deleteTodo } from "./todoslice";
import { fetchUserInfo } from "../user/userSlice";
import { useNavigate } from "react-router-dom";

const DEFAULT_IMAGE = "https://api.dicebear.com/9.x/icons/svg?seed=Katherine";

const TodoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((state) => state.todos);
  const userInfo = useSelector((state) => state.user.info);

  const [form, setForm] = useState({
    todo_name: "",
    todo_desc: "",
    todo_status: "active",
    todo_image: "",
  });

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    if (form.todo_name && form.todo_desc) {
      const todoToAdd = {
        ...form,
        todo_image: form.todo_image || DEFAULT_IMAGE,
      };
      dispatch(addTodo(todoToAdd)).then(() => dispatch(fetchTodos()));
      setForm({
        todo_name: "",
        todo_desc: "",
        todo_status: "active",
        todo_image: "",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
    window.location.reload();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#e0ffe0",
      display: "flex",
      flexDirection: "column"
    }}>
      <header style={{
        background: "linear-gradient(90deg, #4ade80 0%, #22d3ee 100%)",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#065f46" }}>
          <span role="img" aria-label="logo">📝</span> ToDoSome
        </div>
        <nav>
          <a href="/todos" style={{ marginRight: 20, color: "#065f46", textDecoration: "none", fontWeight: "bold" }}>My ToDo</a>
          <button
            onClick={handleLogout}
            style={{
              background: "#059669",
              color: "#fff",
              padding: "0.5rem 1.2rem",
              borderRadius: 6,
              border: "none",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </nav>
      </header>
      <main style={{
        flex: 1,
        display: "flex",
        gap: 24,
        padding: "2rem",
        background: "#e0ffe0"
      }}>
        {/* Add Task */}
        <section style={{
          flex: "0 0 260px",
          background: "#fff",
          borderRadius: 12,
          padding: "1.5rem",
          boxShadow: "0 2px 16px #0001",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch"
        }}>
          <h3 style={{ color: "#065f46", marginBottom: 16 }}>Add Your Task</h3>
          <form onSubmit={handleAdd}>
            <input
              name="todo_name"
              value={form.todo_name}
              onChange={handleChange}
              placeholder="Task Title..."
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: 6,
                border: "1px solid #d1fae5",
                marginBottom: 12,
                fontSize: 15
              }}
            />
            <textarea
              name="todo_desc"
              value={form.todo_desc}
              onChange={handleChange}
              placeholder="Write your task here..."
              required
              rows={4}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: 6,
                border: "1px solid #d1fae5",
                marginBottom: 12,
                fontSize: 15,
                resize: "vertical"
              }}
            />
            <input
              name="todo_image"
              value={form.todo_image}
              onChange={handleChange}
              placeholder="Image URL (optional)"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: 6,
                border: "1px solid #d1fae5",
                marginBottom: 12,
                fontSize: 15
              }}
            />
            <select
              name="todo_status"
              value={form.todo_status}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: 6,
                border: "1px solid #d1fae5",
                marginBottom: 12,
                fontSize: 15
              }}
            >
              <option value="active">Active</option>
              <option value="finished">Finished</option>
            </select>
            <button type="submit" style={{
              width: "100%",
              background: "#059669",
              color: "#fff",
              padding: "0.6rem",
              border: "none",
              borderRadius: 6,
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer"
            }}>
              Save
            </button>
          </form>
        </section>
        {/* My Tasks */}
        <section style={{
          flex: 1,
          background: "#fff",
          borderRadius: 12,
          padding: "1.5rem",
          boxShadow: "0 2px 16px #0001"
        }}>
          {/* User Info */}
          {userInfo && (
            <div style={{ marginBottom: 24, color: "#065f46", fontWeight: "bold" }}>
              User: {userInfo.name} ({userInfo.email})
            </div>
          )}
          <h3 style={{ color: "#065f46", marginBottom: 16 }}>My Tasks</h3>
          {status === "loading" && <p>Loading tasks...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items && items.length > 0 ? (
              items.map((todo) => (
                <li key={todo._id} style={{
                  marginBottom: 18,
                  padding: "0.75rem 1rem",
                  borderRadius: 8,
                  background: "#f0fdf4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div>
                    <div style={{ fontWeight: "bold", color: "#059669" }}>{todo.todo_name}</div>
                    <div style={{ color: "#444" }}>{todo.todo_desc}</div>
                    {todo.todo_image && (
                      <img src={todo.todo_image} alt="todo" style={{ maxWidth: 120, marginTop: 6, borderRadius: 6 }} />
                    )}
                    <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
                      Status: <span style={{ color: todo.todo_status === "active" ? "#059669" : "#f59e42" }}>{todo.todo_status}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(deleteTodo(todo._id)).then(() => dispatch(fetchTodos()))}
                    style={{
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "0.4rem 1rem",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <li>No tasks yet.</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default TodoList;