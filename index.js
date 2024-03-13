const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();

const app=express();
const cors=require("cors");
const router = require("./Routes/user.route");
const courseRouter = require("./Routes/course.route");
const lectureRouter = require("./Routes/lecture.route");

const Port=8080 || process.env.Port

app.get("/",(req,res)=>{
    res.status(200).send({message:"Welcome to Backend of Eduhub here you can login and register by route(api/register ,api/login) For Posts  get (api/posts) post (api/posts) update,delete(api/posts/:post_id) like (api/posts/:post_id/like) comment (api/posts/:post_id/comment)"})
})
app.use(express.json())
app.use(cors())

app.use("/user",router)
app.use("/course",courseRouter)
app.use("/lecture",lectureRouter)
app.listen(Port,async()=>{
    try {
        await mongoose.connect(process.env.MongoURI)
        console.log(`Server is running at ${Port} and connected to Database`)
    } catch (error) {
        console.error(error)
    }
    
})