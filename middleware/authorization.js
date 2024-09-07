const { Validatetoken } = require("../services/authentication")

function CheckForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        let TokenCookie = req.cookies[cookieName]
        
    if(!TokenCookie){
         return next()
    }

   try {
    const userpayload = Validatetoken(TokenCookie)
    req.user = userpayload;
   } catch (error) {}

    return next()
    }

}

module.exports={
    CheckForAuthenticationCookie
}