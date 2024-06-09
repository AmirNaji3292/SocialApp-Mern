import commentModel from '../models/comment/commentModel.js'
import asyncHandler from 'express-async-handler'


// get all comment
export const getAllComment=asyncHandler(async(req,res)=>{

    try {
        const allComment=await commentModel.find({})
        res.json(allComment)
    } catch (error) {
        res.json(error)
        
    }
})



// create comment
export const createComment=asyncHandler(async(req,res)=>{
    const userLogin=req.userId;
    const {post,description}=req.body;

    try {
        const create=await commentModel.create({
            post:post,
            user:userLogin,
            description:description
        })
       
        res.json('comment sended successfully.')

    } catch (error) {
        res.json(error)
    }

})


// get single comment
export const singleComment=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const userId=req.userId;
    try {
        const single=await commentModel.findById(id)
        res.json(single)
    } catch (error) {
        res.json(error)
        
    }
})

// update comment
export const updateComment=asyncHandler(async(req,res)=>{
    const {id}=req.params;

    try {
        const result=await commentModel.findByIdAndUpdate(id,{
            user:req.userId,
            post:req.body.postId,
            description:req.body.description
        })
        res.json('comment updated.')
        
    } catch (error) {
        res.json(error)
        
    }
})


// delete comment
export const deleteComment=asyncHandler(async(req,res)=>{
    const {id}=req.params
    try {
        await commentModel.findByIdAndDelete(id)
        res.json('comment hasbeen deleted.')
    } catch (error) {
        res.json(error)
        
    }
})