const {Schema, model, default: mongoose} = require("mongoose")
const {createHmac ,randomBytes} = require("crypto");
const { createTokenForUser } = require("../services/authentication");


const UserSchema = new Schema({
    fullName:{
        type:"string",
        required:true
    },
    email:{
        type:"string",
        unique:true
    },
    salt:{
        type:"string",
        unique:true
    },
    password:{
         type:"string",
         required:true
    },
    profilepic:{
        type:"string",
        default :"/images/avatar.jpg"
    },
    role:{
        type:"string",
        enum:["admin","user"],
        default:"user"
    }
},{timestamps:true})

UserSchema.pre("save",function(next){

    const user = this;

    console.log(user);

    if(!user.isModified("password")) return;
    
    const salt = randomBytes(16).toString()

    const hashedpass = createHmac("sha256",salt)
    .update(user.password)
    .digest("hex")

    this.salt=salt;
    this.password =hashedpass;

    next()

})
UserSchema.static('matchPasswordAndCreateToken',  async function(email,password){
    const user= await this.findOne({email})
    if(!user) throw new Error("User Not Found")

    if(!user)return false;

    const salt =user.salt;
    const hashedpass = user.password;

    const Userprovidedpass =createHmac("sha256",salt)
    .update(password)
    .digest("hex")

    if(hashedpass!==Userprovidedpass)throw new Error("Incorrect-Password")

    const token = createTokenForUser(user)
    return token;



})


const User= mongoose.model("user",UserSchema)

module.exports = User;