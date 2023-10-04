import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePosts from "./ProfilePosts";
import robot from "../components/robot.gif";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import HomePosts from "../components/HomePosts";
import "../App.css";

const Profile = () => {
  const params = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [update, setUpdate] = useState(false);

  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  // console.log(user);
  const navigate = useNavigate();
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
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/users/" + user._id
      );
      setUsername(res.data.username);
      setEmail(res.data.email);

      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllPosts();
    fetchProfile();
  }, [params]);

  const handleUserDelete = async () => {
    try {
      const res = axios.delete("http://localhost:8000/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleUserUpdate = async () => {
    setUpdate(false);
    try {
      const res = axios.put(
        "http://localhost:8000/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      setUpdate(true);
    } catch (err) {
      console.log(err);
      setUpdate(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          {posts.length !== 0 ? (
            <h1 className="text-xl font-bold mb-4">Your posts:</h1>
          ) : (
            <h1 className="text-xl font-bold mb-4">No posts available</h1>
          )}
          {posts.length !== 0 ? (
            posts.map((post) => (
              <>
               <Link to={user?`/posts/post/${post._id}` : "/login"}>
               <HomePosts key={post._id} post={post} />
               </Link>
              
              </>
            ))
          ) : (
            <>
              
              <img src={robot} className="robot"></img>
            </>
          )}
        </div>
        <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
          <div className=" flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your email"
              type="email"
            />
            {/* <input onChange={(e)=>{setPassword(e.target.value)}} value={password}  className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" type="password"/> */}

            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
            {update && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                updated successfully !!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
