import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Post from "./pages/post";
import AnimeDetail from "./pages/AnimeDetail";
import NotFound from "./pages/notFound";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/anime/:endpoint" element={<AnimeDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
