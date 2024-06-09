import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
     firstName: {
          type: String,
          required:[true, "name cant be empty."]
     },
     lastName: {
          type: String,
          required:[true, "lastname cant be empty."]

     },
     profilePhoto: {
          type: String,
          default: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
     },
     email: {
          type: String,
          required:[true, "email cant be empty."]

     },
     bio: {
          type: String
     },
     password: {
          type: String,
          required:[true, "password cant be empty."]

     },
     isBlocked: {
          type: Boolean,
          default: false,
     },
     isAdmin: {
          type: Boolean,
          default: false,
     },
     isFollowing: {
          type: Boolean,
          default: false,
     },
     isAccountVerified: {
          type: Boolean,
          default: false
     },
     accountVerificationToken: String,
     accountVerificationTokenExpires: Date,

     viewedBy: {
          type: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
               }
          ]
     },
     followers: {
          type: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
               }
          ]
     },
     following: {
          type: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
               }
          ]
     },
     passwordChangeAt: Date,
     passwordResetToken: String,
     passwordResetExpire: Date,
     refresh_token:{
          type: String,
     }
},{
   toJSON: {
        virtuals: true
   },
   toObject: {
        virtuals: true,
   }  ,
   timestamps: true
})


userSchema.virtual("posts",{
     ref:"Post",
     foreignField:"user",
     localField:"_id",
})



userSchema.pre("save", async function(next){
     if(!this.isModified("password")){
          next()
     }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.isPasswordMatched=async function(enterPassword){
  return await bcrypt.compare(enterPassword,this.password)
}



userSchema.methods.createVerificationAccountToken=async function(){
    const token=crypto.randomBytes(32).toString('hex')
    this.accountVerificationToken=crypto.createHash('sha256').update(token).digest('hex')
    this.accountVerificationTokenExpires=Date.now()+30*60*1000
    return token;
}


userSchema.methods.forgetPass=async function(){
    const token=crypto.randomBytes(32).toString('hex')
    this.passwordResetToken=crypto.createHash('sha256').update(token).digest('hex')
    this.passwordResetExpire=Date.now()+30*60*1000
    return token;
}

export default mongoose.model("User", userSchema)