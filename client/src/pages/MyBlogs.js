import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserContext } from "../context/userContext";
import axios from "axios";
import HomePosts from "../components/HomePosts";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  console.log(user);

  const getAllPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/posts/user/${user._id}`
      );
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, [user]);
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {posts.map((post) => (
           <Link to={user?`/posts/post/${post._id}` : "/login"}>
           <HomePosts key={post._id} post={post} />
           </Link>
          
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default MyBlogs;
