import jwt from 'jsonwebtoken'
import UserModel from '../models/users/UserModel.js';


// create refresh token
export const RefreshToken=async(req,res,next)=>{
    try {
        const refreshToken=req.cookies.refreshToken;
        if(!refreshToken)return res.json('not found refresh token')
        const user=await UserModel.findOne({refresh_token:refreshToken})
    if(!user)return res.json('user not found by refresh token!')
    jwt.verify(refreshToken,process.env.REFRESHTOKEN_KEY,(err,decode)=>{
    if(err)return res.json('problem in verify refresh token!')
    const userId=user._id;
    const firstName=user.firstName
    const lastName=user.lastName
    const email=user.email
    const profilePhoto=user.profilePhoto
    const isAdmin=user.isAdmin
    const isAccountVerified=user.isAccountVerified


    const accessToken=jwt.sign({userId,firstName,isAdmin,email,lastName,profilePhoto,isAccountVerified},process.env.ACCESSTOKEN_KEY,{expiresIn:"15s"})
       
     res.json({accessToken})
    })
    } catch (error) {
        console.log(error)
    }
}