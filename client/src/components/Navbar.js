import React, { useContext, useState } from "react";
import "../App.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import logo from "./wasimBlog.png"

import { UserContext } from "../context/userContext";

const Navbar = () => {
  const [prompt,setPrompt] = useState("")
  const [menu, setMenu] = useState(false);
  const {user}= useContext(UserContext);
  // console.log("user",user);
  // const {user} = useContext(UserContext);
  console.log(prompt);
  const navigate = useNavigate();
  const path = useLocation().pathname
  // const name = user?.username.toUpperCase()
  const showMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">{<img className="logo" src={logo}></img>}</Link>
      </h1>
     {path==="/" && <div className="flex justify-center items-center space-x-0 mr-20 " id="serachBox">
        <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer">
          <BsSearch />
        </p>
        <input
          className="outline-none px-3"
          placeholder="Search a post"
          type="text"
          onChange={(e)=>{setPrompt(e.target.value)}}
        ></input>
      </div>}

      <div className="flex items-center justify-center space-x-2 md:space-x-4">
      {/* <h1 className="text-sm md:text-sm">{name}</h1> */}

        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars />
              {menu && <Menu />}
            </p>
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
          {menu && <Menu />}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
