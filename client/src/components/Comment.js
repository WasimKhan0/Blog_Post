import axios from "axios";
import React, { useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../context/userContext";

const Comment = ({ c, post, fetchPostComment }) => {
  const { user } = useContext(UserContext);
  const deleteComment = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/comments/${c._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      fetchPostComment();
      // window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 21)}</p>
          {user?._id === c?.userId ? (
            <div className="flex items-center justify-center space-x-2 cursor-pointer">
              <p onClick={deleteComment}>
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;
