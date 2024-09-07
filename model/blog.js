const { Schema, model, default: mongoose } = require("mongoose");


const blogSchema = new Schema({
    title:{
        type:"string",
        required:true
    },
    body:{
        type:"string",
        required:true
    },
    coverImageUrl:{
        type:"string",
        required:false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },


},{timestamps:true})


const blog = mongoose.model("blog",blogSchema)

module.exports=blog;