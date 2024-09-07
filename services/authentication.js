const JWT = require("jsonwebtoken")

const secret ="cheen chapak dam dam"

function createTokenForUser(user){
    const payload={
         _id:user.id,
         email:user.email,
         role:user.role,
         profileImageUrl:user.profileImageUrl

    }

    const token = JWT.sign(payload,secret)

    return token;
}

function Validatetoken (token){
    const payload = JWT.verify(token,secret)
    return payload;
}

module.exports ={
    createTokenForUser ,
    Validatetoken
}