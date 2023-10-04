import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import img from "../components/img.jpg";
import Navbar from "../components/Navbar";
import { IF } from "../components/URL";
import like from "./like.png";
import disLike from "./notlike.png";

import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

const PostDetails = () => {
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const postId = useParams().id;
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likesCount, setLikesCount] = useState(0);

  const [liked, setLiked] = useState(false);

  const handleDelete = async () => {
    try {
      const obj = await axios.delete(
        "http://localhost:8000/api/posts/" + postId,
        { withCredentials: true }
      );
      console.log(obj);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPost = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/posts/" + postId);
      console.log(res.data);
      setPost(res.data);
    } catch (err) {
      // console.log(err);
    }
  };
  const fetchPostComment = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/comments/post/" + postId
      );
      console.log(res.data);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComment();
    fetchPost();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      setComment("");
      fetchPostComment();
      // window.location.reload(true)
    } catch (err) {
      console.log(err);
    }
  };

  //handle like
  

  const handleLike = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/posts/likes/" + postId,
        {
          userId: user._id,
        }
      );
    console.log(res.data);
    setPost(res.data.newPost)
    // setLiked(post?.likes?.includes(user._id))
      if (res.data.data === "postliked") {
        setLikesCount(likesCount+1);
        setLiked(true)
        
      } else {
        // if (likesCount < 0) {
        //   setLikesCount(post?.likes?.length);
        // } else {
        //   setLikesCount(post?.likes?.length-1);
        // }
        setLikesCount(likesCount-1);
        setLiked(false)
      }

    } catch (err) {
      console.log(err);
    }
  };
// useEffect(()=>{
//   setLiked(post?.likes?.includes(user._id))
// },[likesCount])

console.log(post?.likes?.includes(user._id));

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px[200px] mt-8">
        {/* {loader?<div className="h-[80vh] flex justify-center items-center w-full"><Loader/></div>:<div className="px-8 md:px-[200px] mt-8"> */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            {post.title}
          </h1>
          {user?._id === post?.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer"
                onClick={() => navigate("/edit/" + postId)}
              >
                <BiEdit />
              </p>
              <p className="cursor-pointer" onClick={handleDelete}>
                <MdDelete />
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
          </div>
        </div>
        <img
          src={IF + post.photo}
          className="w-[100%] h-[680px] mx-auto mt-8"
          alt=""
        />
        <p className="mx-auto mt-8">{post.desc}</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>

          <div className="flex justify-center items-center space-x-2">
            {post.categories?.map((c, i) => (
              <>
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                  {c}
                </div>
              </>
            ))}
          </div>
        </div>

       
        <div className="flex space-x-2 mt-3">
          <button onClick={handleLike}>
            {
              post?.likes?.includes(user._id)? <img src={like}></img>: <img src={disLike}></img>
            }
           
          </button>
          
            <p className="text-1xl text-large text-black ">{post?.likes?.length}</p>
        </div>


        {/* comments */}
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          {comments?.map((c) => (
            <Comment
              key={c._id}
              c={c}
              post={post}
              fetchPostComment={fetchPostComment}
            />
          ))}
        </div>

        {/* comment */}

        {/* write a comment */}
        <div className="w-full flex flex-col mt-4 md:flex-row">
          <form
            className="w-full flex flex-col mt-4 md:flex-row"
            onSubmit={postComment}
          >
            <input
              onChange={(e) => {
                setComment(e.target.value);
              }}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
              value={comment}
            />
            <button className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">
              Add Comment
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
