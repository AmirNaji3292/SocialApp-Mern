import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:[true,'need post id !']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,'need user creator id']
    },
    description:{
        type:String,
        required:[true, 'need description']
    }
},{timestamps:true})

export default  mongoose.model('Comment',commentSchema)