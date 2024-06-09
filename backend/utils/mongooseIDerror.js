import mongoose from "mongoose";

export const validMongooseId=(id)=>{
    const isValid=mongoose.Types.ObjectId.isValid(id)
    if(!isValid)throw new Error('user not found or id is incorrect')
}