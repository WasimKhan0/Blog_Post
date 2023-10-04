const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();
const multer = require("multer")
const authRouter = require("./Routes/AuthRoute");
const userRouter = require("./Routes/userRoutes");
const postRouter = require("./Routes/PostRoute");
const commentRouter = require("./Routes/commentRoute");
const path = require("path");

mongoose.connect("mongodb://127.0.0.1:27017/BLOG-APP")
.then(()=>{console.log("connected to db")})
.catch((e)=>console.log(e));

app.use(express.json())
app.use(cookieParser())
app.use("/images",express.static(path.join(__dirname,"/images")))

app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);
app.use("/api/posts",postRouter);
app.use("/api/comments",commentRouter);
//image upload
const storage=multer.diskStorage({
    destination:(req,res,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})
const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file",(req,res)=>{
    res.status(200).json("Image has been uploaded")
}))
app.listen(process.env.PORT ,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})