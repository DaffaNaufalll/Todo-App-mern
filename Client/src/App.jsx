import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TodoList from "./features/todo/TodoList";
import LoginPage from "./pages/LoginPage";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = user && user.token;

  return (
    <Routes>
      <Route path="/signin" element={<LoginPage />} />
      <Route
        path="/todos"
        element={isAuthenticated ? <TodoList /> : <Navigate to="/signin" />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/todos" /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
}

export default App;