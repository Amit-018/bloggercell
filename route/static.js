const user = require("../model/user")

const express = require("express")

const router = express.Router()



router.get("/signin",(req,res)=>{
    res.render("signin")
})

router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.get("/logout",(req,res)=>{
    res.clearCookie("uid").redirect("/")
})

router.post("/signUp",async(req,res)=>{

    const { fullName, email, password}= req.body

    await user.create({
        fullName,
        email,
        password
    });

    return res.redirect("/")

})

router.post("/signin",async(req,res)=>{
     const {email,password}=  req.body;
     
     try {
        const token =   await user.matchPasswordAndCreateToken(email,password)

        res.cookie("uid",token).redirect("/")
        
     } catch (error) {
        return res.render("signin" ,{
            error:"Incorrect ID Or Password"
        })
        
    }


    
})


// router.get("/login" , (req,res)=>{
//     res.render("login")
// })

module.exports= router;