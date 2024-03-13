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
    res.status(200).send({message:"Welcome to Backend of Eduhub here you can login and register by route(user/register ,user/login) For Courses  get (/course) create (/course/create) update,delete(/course/:courseId) {For Enrolling in Courses (/course/enroll/:courseId')} For lecture (/lecture/create) update,delete(/lecture/:lectureId))"})
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