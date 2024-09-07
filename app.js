require('dotenv').config();

const express = require("express")

const app = express()

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 1000000000, // 100 seconds
  socketTimeoutMS: 45000, // Optional: Adjust as needed
});


const path = require("path")

const CookieParser = require("cookie-parser")

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

const user = require("./model/user")
const Blog = require("./model/blog")

const staticRoute = require("./route/static")
const blogRoute = require("./route/blog")
const { CheckForAuthenticationCookie } = require("./middleware/authorization")

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.resolve("./public")))

app.use(CookieParser())
app.use(CheckForAuthenticationCookie("uid"))

app.use("/user",staticRoute)
app.use("/blog",blogRoute)

app.get("/" , async(req,res)=>{
    const allblogs = await Blog.find({})
    res.render("home",{
        user:req.user,
        blogs:allblogs
    })
   
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running...');
});

console.log("server started on 3000 port");

console.log("Mongodb connected");