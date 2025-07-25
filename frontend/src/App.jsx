import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TaskHomePage from "./components/TaskHomePage/TaskHomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<TaskHomePage />} />
      </Routes>
    </>
  );
}

export default App;
