import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import HomePage from "./pages/HomePage";
import ChatsPage from "./pages/ChatsPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatsPage />} />
      </Routes>
    </div>
  );
}

export default App;
