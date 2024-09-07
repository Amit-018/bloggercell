const {Schema,model, default: mongoose}=require("mongoose")

const commentschema = new Schema({
    content:{
        type:"string",
        required:true
    },
    blogID:{
        type: Schema.Types.ObjectId,
        ref: "blog",
    },
    createdby:{
        type: Schema.Types.ObjectId,
        ref: "user",
    }
} ,{timestamps:true})


const comment= mongoose.model("comment",commentschema)

module.exports=comment;