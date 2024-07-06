// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Anime from "./pages/Anime";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/anime/:endpoint" element={<Anime />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
