import User from "../models/users/UserModel.js"
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { validMongooseId } from "../utils/mongooseIDerror.js"
import nodemailer from "nodemailer";
import crypto from 'crypto'
import { cloudinaryUploadImage } from "../utils/cloudinary.js";
import fs from 'fs'
import postModel from '../models/post/postModel.js'
import commentModel from '../models/comment/commentModel.js'




// get users
export const getUsers=asyncHandler(async(req,res)=>{
    try {
        const result=await User.find()
        res.json(result)

    } catch (error) {
        throw new Error(error)
    }
})

// Register function
export const userRegister=asyncHandler(async(req,res)=>{

    const existUser=await User.findOne({email:req.body.email})
     if(existUser)throw new Error("user before has been enrolled with this email.")
     
    try {
        const result=await User.create({
            firstName:req?.body?.firstName,
            lastName:req?.body?.lastName,
            email:req?.body?.email,
            password:req?.body?.password,
        })
        res.json('You successfully registerd.')

    } catch (error) {
       res.json(error)
    }
})


//login function

export const userLogin=asyncHandler(async(req,res)=>{
    const {email, password}=req.body;
    const foundUser=await User.findOne({email})
    if(foundUser && (await foundUser.isPasswordMatched(password))){
       const userId=foundUser._id;
       const firstName=foundUser.firstName
       const lastName=foundUser.lastName
       const email=foundUser.email
       const profilePhoto=foundUser.profilePhoto
       const isAdmin=foundUser.isAdmin
       const isAccountVerified=foundUser.isAccountVerified


       const accessToken=jwt.sign({userId,isAdmin,firstName,email,lastName,profilePhoto,isAccountVerified},process.env.ACCESSTOKEN_KEY,{expiresIn:"15s"})
       

     
       const refreshToken=jwt.sign({userId,isAdmin,firstName,email,lastName,profilePhoto,isAccountVerified},process.env.REFRESHTOKEN_KEY,{expiresIn:"1d"})
      
       await User.findByIdAndUpdate(userId,{refresh_token:refreshToken})

    //    res.cookie('refreshToken',refreshToken,{
    //     httpOnly:true,
    //     maxAge:24*60*60*1000
    //    })
        res.cookie("refreshToken", refreshToken, {
       httpOnly: true,
         secure: true,
         sameSite: "none",
           maxAge: 24 * 60 * 60 * 1000,
          });
    
       res.json({isAdmin,accessToken,userId,firstName,email,lastName,profilePhoto,isAccountVerified})

    }else{throw new Error('email or password is incorrect!.')
    }
})



// delete function
export const deleteUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try {
        await postModel.deleteMany({user:id})
        await commentModel.deleteMany({user:id})
        await User.findByIdAndDelete(id)
        res.json('user has been deleted.')
    } catch (error) {
        throw new Error(error)
    }
})


// detail for one user
export const detailUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try {
        const user=await User.findById(id).populate('posts').populate('viewedBy').populate("following").populate('followers')
        res.json(user)
        
    } catch (error) {
        throw new Error(error)
       
    }
})


// see profile

export const userProfile=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const loginId=req.userId;

    try {
        const user=await User.findById(id).populate('posts')
        .populate('viewedBy').populate("following").populate('followers')
        const alreadyView= 
        user.viewedBy.find(u=>u._id.toString()===loginId.toString())
        if(alreadyView){
             res.json(user)
        }else{
         const user=  await User.findByIdAndUpdate(id,{
            $push:{viewedBy:loginId}
           },{new:true})
           res.json(user)
        }
    } catch (error) {
        throw new Error(error)
        
    }
})

// update user detail

export const updateUser=asyncHandler(async(req,res)=>{
    const id=req.userId;

    
    try {
        const user=await User.findByIdAndUpdate(id,{
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            bio:req.body.bio
        })
        res.json('Profile successfully updeted.')
    } catch (error) {
        throw new Error(error)
       
    }
})


// update password
export const updatePassword=asyncHandler(async(req,res)=>{
    const id =req.userId;
    const password=req.body.password;
    try {
        const user=await User.findById(id)
        if(password){
            user.password=password;
            await user.save()
            res.json('password edited.')
        }

    } catch (error) {
        throw new Error(error)
    }
})



// following function
export const followingUser=asyncHandler(async(req,res)=>{
    const otherId=req.body.followId;
    const ownId=req.userId;
    
    const targetUser=await User.findById(otherId);

    const allFollowers=targetUser.followers.find((user)=>
        user.toString()===ownId.toString()
    )
    if(allFollowers)throw new Error('you followed this user before.')

    await User.findByIdAndUpdate(otherId,{
        $push:{followers:ownId},
        isFollowing:true
    },{
        new:true
    })

    await User.findByIdAndUpdate(ownId,{
        $push:{following:otherId}
    },{new:true})

    res.json('you followed this user.')
})
// findFollower

export const findFollower=asyncHandler(async(req,res)=>{
    try {
        const userId=req.body.userId;
        const followeId=req.body.followId;
        const userFollow=await User.findById(followeId)
        const allreadyFollowed=await userFollow.followers.find((user)=>userId.toString()===user.toString())
        if(allreadyFollowed){
            res.json(true)
        }else{
            res.json(false)
        }

    } catch (error) {
        console.log(error)
    }
})

// unfollowing func
export const unFollow=asyncHandler(async(req,res)=>{
    const otherId=req.body.unfollowId;
    const ownId=req.userId;
    
    await User.findByIdAndUpdate(otherId,{
        $pull:{followers:ownId},
        isFollowing:false
    },{
        new:true
    })

    await User.findByIdAndUpdate(ownId,{
        $pull:{following:otherId}
    },{new:true})

     res.json('You Unfollow this User.')
})


// block user
export const block=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    await User.findByIdAndUpdate(id,{
        isBlocked:true},
        {new:true})

        res.json('You Blocked this user.')
}
)

// unblock user
export const unblock=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validMongooseId(id)
   const user= await User.findByIdAndUpdate(id,{
        isBlocked:false},
        {new:true})

        res.json(user)
}
)





// send email by admin

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth: {
      user: "videocode2021@gmail.com",
      pass: "euhdlsesyhasgbne"
    }
  })
  
  
  export const sendEmailMsg = asyncHandler(async(req,res)=> {
    const {to, subject, message, email} = req.body;
    try {
      let details = {
        from : email,
        to: to,
        subject: subject,
        text: message,
      }
  
      await transporter.sendMail(details)
      res.json("ایمیل با موفقیت ارسال شد.")
  
    } catch (error) {
      res.json(error)
    }
  })
  
  

// Create verify account
  
export const CreateVerifyAccountEmail = asyncHandler(async(req,res)=> {

    const loginUser = req.body.user;
    const user = await User.findById(loginUser)
    try {
  
      const verificationToken = await user.createVerificationAccountToken();
      await user.save();
  
      const resetUrl = `این ایمیل برای تایید حساب کاربری شما ارسال شده است, برای تایید حساب روی لینک زیر کلیک کنید <a href="http://localhost:3000/verify-account/${verificationToken}">تایید حساب</a>`
  
      let details = {
        from : "videocode2021@gmail.com",
        to: user.email,
        subject: "تایید حساب کاربری",
        html: resetUrl
      }
  
      await transporter.sendMail(details, (err) => {
        if(err) {
          res.json(err);
        }else{
          res.json("برای فعالسازی حساب کاربری ایمیل خود را چک کنید.")
        }
      })
  
    } catch (error) {
      res.json(error)
    }
  })

  
//   verify account
 
export const verifyaccount=asyncHandler(async(req,res)=>{
    try {
        const {token} = req.body;
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
        
        const userFound = await User.findOne({
            accountVerificationToken: hashedToken,
            accountVerificationTokenExpires: {$gt: new Date()},
        })
      
        if(!userFound) throw new Error("توکن منقضی شده است.")
      
       
        userFound.isAccountVerified = true;
        userFound.accountVerificationToken = undefined;
        userFound.accountVerificationTokenExpires = undefined;
        await userFound.save();
        res.json(userFound)

  } catch (error) {
    console.log(error)
  }
    
})


// forget password
export const forgetPassword=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const userfound=await User.findOne({email})
    if(!userfound)throw new Error('user not exist in db')
    
    try {
        const token=await userfound.forgetPass()
        await userfound.save()

 const resetUrl=`click for change password <a href="http://localhost:3000/reset-password/${token}">verify account</a>`

 let details = {
    from : "videocode2021@gmail.com",
    to:email,
    subject: "Reset password",
    html:resetUrl
  }

  await transporter.sendMail(details)
  res.json("successfully sended Email .please check your email.") 


    } catch (error) {
        throw new Error(error)
    }
})


// verify forget password
export const verifyForgetPassword=asyncHandler(async(req,res)=>{
    const {token,password}=req.body;
    const hashToken=crypto.createHash('sha256').update(token).digest('hex');
    const user=await User.findOne({
        passwordResetToken:hashToken,
        passwordResetExpire:{$gt:new Date()}
    })

    if(!user)throw new Error('not found user for change password...')
    user.password=password;
    user.passwordResetToken=undefined;
    user.passwordResetExpire=undefined

    await user.save()
    res.json('password successfully changed.')

})


// upload photo prifle
export const uploadProfile=asyncHandler(async(req,res)=>{
   try {
    const uid=req.userId
    const localPath=`public/image/profile/${req.file.filename}`
    const imageUploaded = await cloudinaryUploadImage(localPath)

    const foundUser=await User.findByIdAndUpdate(uid,{
        profilePhoto:imageUploaded.url
    },{
        new:true
    })
    fs.unlinkSync(localPath)
    res.json("Photo successfully uploaded.")
    
   } catch (error) {
      console.log(error)
   }
})




// Log Out
export const logOut=asyncHandler(async(req,res)=>{
    const refreshtoken=req.cookies.refreshToken;
    if(!refreshtoken)return res.json('not found refreshToken')
   

   
        const user=await User.findOne({refresh_token:refreshtoken})
       
        if(!user)return res.json('not found user')
        user.refresh_token=undefined;
       await user.save()
       res.clearCookie('refreshToken')
       res.json('successfully log out.')
   
    
})


// getPopularUser
 
 export const getPopularUser=asyncHandler(async(req,res)=>{
    try {
        const response=await User.find({}).populate('followers').limit(10)
        res.json(response)
    } catch (error) {
        console.log(error)
    }
 })


