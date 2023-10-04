import React, { useContext, useState } from "react";
import img from "../components/img.jpg"
import { IF } from "./URL";
import { UserContext } from "../context/userContext";
import axios from "axios";
const HomePosts = ({post}) => {
  const {user} = useContext(UserContext);
  // console.log("post--->",post)
  // const [likes, setLikes] = useState();
  // const handleLike=async()=>{
  //   try{
  //     const res = await axios.post("http://localhost:8000/api/posts/likes/"+post._id,user._id)
  //     console.log(res.data);
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={IF+post.photo} className="h-full w-full object-cover"></img>
        {/* <p onClick={handleLike}>btn</p> */}

      </div>
      {/* Right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16,21)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
         {post.desc.slice(0,200)+"...Read more"}
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
