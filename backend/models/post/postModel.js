import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
     title: {
          type: String,
          trim: true,
          required: [true, "وارد کردن عنوان الزامی است"]
     },
     category: {
          type: String,
          default: "all",
          required: [true, "وارد کردن دسته بندی الزامی است"]
     },
     isLike: {
          type: Boolean,
          default: false,
     },
     isDisLiked: {
          type: Boolean,
          default: false,
     },
     numViews: {
          type: Number,
          default: 0,
     },
     likes: [
          {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"  
          }
     ],
     disLikes: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User"  
          }
     ],
     user: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
               required: [true, "وارد کردن نویسنده الزامی است"]
     },
     description:{
          type: String,
          required: [true, "وارد کردن متن الزامی است"]
     },
     image: {
          type: String,
          default: "https://images.unsplash.com/photo-1668027686570-aff6795ed3c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
     }
},{
   toJSON: {
        virtuals: true,
   }  ,
   toObject:{
        virtuals: true,
   },
   timestamps: true,
})

postSchema.virtual("comments", {
     ref: "Comment",
     foreignField: "post",
     localField: "_id"
})


export default mongoose.model("Post", postSchema)