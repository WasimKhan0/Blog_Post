import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import book from "../components/book.png"
const CreatePost = () => {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
   const navigate = useNavigate();
  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        const imgUpload = await axios.post(
          "http://localhost:8000/api/upload",
          data
        );
        // console.log(imgUpload.data);
      } catch (err) {
        console.log(err);
      }

      try {
        const res = await axios.post(
          "http://localhost:8000/api/posts/create",
          post,
          { withCredentials: true }
        );

        navigate("/posts/post/"+res.data._id)
      } catch (err) {
        console.log(err);
      }
    }
  };
  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    console.log(updatedCats);
    setCat("");
    setCats(updatedCats);
  };
  const deleteCategory = (i) => {
  
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);

    setCats(updatedCats);
  };
  return (
    <>
    <Navbar />
    <div className="flex">
      
      <div className="px-6 md:px-[200px] mt-8 w-[60%]">
        <h1 className="font-bold md:text-2xl text-xl ">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="file"
            className="px-4"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
                value={cat}
                onChange={(e) => {
                  setCat(e.target.value);
                }}
              />
              <div
                onClick={addCategory}
                className="bg-black text-white w-[150px] px-4 py-2 font-semibold cursor-pointer text-center"
              >
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 py-1 rounded-md  pl-2"
                >
                  <p>{c}</p>
                  <p className="text-white bg-black rounded-full cursor-pointer p-1 text-sm">
                    <ImCross onClick={() => deleteCategory(i)} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <textarea
            rows={3}
            cols={30}
            className="px-4 py-2 outline-none"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            placeholder="Enter post description"
          />
          <button
            onClick={handleCreate}
            className="bg-black w-full   text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Create
          </button>
        </form>
      </div>
      <img className="w-[400px] h-[400px] mt-10"  src={book}></img>
      
    </div>
   <Footer/>
    </>
  );
};

export default CreatePost;
