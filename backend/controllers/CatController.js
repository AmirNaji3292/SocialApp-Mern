import categoryModel from "../models/Category/categoryModel.js";
import asyncHandler from 'express-async-handler'

// get all category
export const getAllCat=asyncHandler(async(req,res)=>{
    try {
        const category=await categoryModel.find().populate("user")
        res.json(category)
    } catch (error) {
        throw new Error(error)
    }
})



// create category
export const createCat=asyncHandler(async(req,res)=>{
    const userId=req.userId;
    const title=req.body.title;
  try {
    const result=await categoryModel.create({
        user:userId,
        title:title
    })
    res.json('Category Created.')
  } catch (error) {
    throw new Error(error)
  }
})


// get single cat
export const getSingleCat=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try {
        const singelcat=await categoryModel.findById(id).populate("user")
        res.json(singelcat)
    } catch (error) {
    throw new Error(error)
        
    }
})

// update cat
export const updateCat=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    
    try {
    const result=await categoryModel.findByIdAndUpdate(id,{
        title:req.body.title
    },{new:true})
    res.json('Successfully Edit.')
    } catch (error) {

       throw new Error(error)
        
    }
})


// delete category
export const deleteCat=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try {
        await categoryModel.findByIdAndDelete(id)
        res.json('category has been deleted.')
    } catch (error) {
       throw new Error(error)
        
    }
})