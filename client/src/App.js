import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./context/userContext";
import MyBlogs from "./pages/MyBlogs";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/write" element={<CreatePost />}></Route>
        <Route path="/posts/post/:id" element={<PostDetails />}></Route>
        <Route path="/edit/:id" element={<EditPost />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route path="/myblogs/:id" element={<MyBlogs />}></Route>

      </Routes>
    </UserContextProvider>
  );
};

export default App;
