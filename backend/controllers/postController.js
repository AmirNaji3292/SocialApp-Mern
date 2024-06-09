import postModel from "../models/post/postModel.js";
import asyncHandler from 'express-async-handler'
import { cloudinaryUploadImage } from "../utils/cloudinary.js";
import fs from 'fs'
import { validMongooseId } from "../utils/mongooseIDerror.js";
import UserModel from "../models/users/UserModel.js";
import { blockUser } from "../utils/blockUser.js";




export const createPost=asyncHandler(async(req,res)=>{
    const {user}=req.body;
    const userData=await UserModel.findById(user)
    await blockUser(userData)


    const localPath=`public/image/posts/${req.file.filename}`
    const uploadImg=await cloudinaryUploadImage(localPath)
    try {
        const createdpost=await postModel.create({
            title:req.body.title,
            description:req.body.description,
            image:uploadImg.url,
            category:req.body.category,
            user:req.body.user

        })
        fs.unlinkSync(localPath)
        res.json('post hasbeen successfully upload')
    } catch (error) {
        throw new Error(error)
    }
})



// get All Posts
export const getAllpost=asyncHandler(async(req,res)=>{
    try {
        const posts=await postModel.find({}).populate('user')
        res.json(posts)
    } catch (error) {
        throw new Error(error)
        
    }
})

// get popular posts
 export const PopularPost=asyncHandler(async(req,res)=>{
    try {
        const response=await postModel.find({}).populate('user').sort('-numView').limit(10)
        res.json(response)
    } catch (error) {
        console.log(error)
    }
 })

// get single post
export const getSinglePosts = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validMongooseId(id);
    try {
      const post = await postModel.findById(id)
        .populate("user")
        .populate({path:"comments",
           populate:{path:"user"}

        })
        .populate("likes")
        .populate("disLikes");
  
      await postModel.findByIdAndUpdate(
        id,
        {
          $inc: { numViews: 1 },
        },
        { new: true }
      );
      res.json(post);
    } catch (error) {
      res.json(error);
    }
  });

// update post
export const updatePost=asyncHandler(async(req,res)=>{
       const {id}=req.params;
       validMongooseId(id)
       const {title,description,category,user}=req.body;
    try {
        const updated=await postModel.findByIdAndUpdate(id,{
            title:title,
            description:description,
            user:user,
            category:category
        },{new:true})

        res.json("Successfully Edited Your Post.")
    } catch (error) {
        throw new Error(error)
        
    }
})



// delete post
export const deletePost=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    try {
        await postModel.findByIdAndDelete(id)
        res.json('post has been deleted.')
    } catch (error) {
        throw new Error(error)
        
    }
})


// like a post
export const togglePostLike=asyncHandler(async(req,res)=>{
    const {id}=req.body;
    const loginId=req.userId;
    
    const post =await postModel.findById(id)


    const isLike= post.isLike

   const alreadyDislike=post.disLikes.find(id=>id.toString()===loginId.toString())
   if(alreadyDislike){
    const result=await postModel.findByIdAndUpdate(id,{
        $pull:{disLikes:loginId},
        isDisLiked:false
    },{new:true})
   }

   if(isLike){
     const result=await postModel.findByIdAndUpdate(id,{
        $pull:{likes:loginId},
        isLike:false
     },{new:true})
     res.json(result)
   }else{
    const likedPost=await postModel.findByIdAndUpdate(id,{
        $push:{likes:loginId},
        isLike:true,
    },{new:true})
    res.json(likedPost)
   }
})


// dislike a post 
export const dislikePost=asyncHandler(async(req,res)=>{
    const {id}=req.body;
    const loginId=req.userId;
    
    const post =await postModel.findById(id)

    const disLikePost=post.isDisLiked

    const alreadyLike=await post.likes.find(id=>id.toString()===loginId.toString())
    if(alreadyLike){
        await postModel.findByIdAndUpdate(id,{
            $pull:{likes:loginId},
            isLike:false
        })
    }

    if (disLikePost) {
        const result=await postModel.findByIdAndUpdate(id,{
            $pull:{disLikes:loginId},
            isDisLiked:false,
        },{new:true})
        res.json(result)
    } else {
        const resultt=await postModel.findByIdAndUpdate(id,{
            $push:{disLikes:loginId},
            isDisLiked:true,

        },{new:true})
        res.json(resultt)
    }

})