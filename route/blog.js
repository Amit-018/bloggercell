const express = require("express")

const router = express.Router()

const user = require("../model/user")

const multer = require("multer")

const Blog = require("../model/blog")

const Comment = require("../model/comments")

const path = require("path")

const storage = multer.diskStorage({
    destination:function(req ,file ,cb){
        return cb(null,path.resolve(`./public/uploads`))
    },
    filename:function (req ,file,cb){
        const filename =`${Date.now()}-${file.originalname}`
        cb(null,filename)

    }
})

const upload = multer({storage:storage})

router.get("/add-new" ,(req,res)=>{
    return res.render("addblog",{
        user:req.user,
    })
})

router.get("/:id",async (req,res)=>{
   const blog =  await Blog.findById(req.params.id).populate("createdBy")
   const comments = await Comment.find({blogID:req.params.id}).populate("createdBy")

   console.log(comments);
   

    return res.render("blog",{
        user:req.user,
        blog,
        comments
    })
})

router.post("/comments/:blogId" ,async(req,res)=>{
    await Comment.create({
        content:req.body.content,
        blogId:req.params.blogID,
        createdBy:req.user._id,

    })
    return res.redirect(`/blog/${req.params.blogId}`)
})




router.post("/",upload.single("coverImage"),async(req,res)=>{
    const {title,body} = req.body

   const blog = await Blog.create({
    body,
    title,
    createdBy:req.user._id,
    coverImageUrl:`/uploads/${req.file.filename}`
   })
    return res.redirect(`/Blog/${blog._id}`)
})



module.exports= router;