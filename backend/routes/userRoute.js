import express from 'express'
import {  block, CreateVerifyAccountEmail, deleteUser, detailUser, findFollower, followingUser, forgetPassword, getPopularUser, getUsers, logOut, sendEmailMsg, unblock, unFollow, updatePassword, updateUser, uploadProfile, userLogin, userProfile, userRegister, verifyaccount, verifyForgetPassword } from '../controllers/userController.js'
import { verifyToken } from '../midleware/token/verifyToken.js'
import { RefreshToken } from '../controllers/RefreshToken.js'
import { photoUpload, profilePhotoResize } from '../midleware/upload/uploadphoto.js'

const router=express.Router()

router.get('/api/token',RefreshToken)

router.post('/api/users/login',userLogin)
router.post('/api/users/register',userRegister)
router.get('/api/users',verifyToken,getUsers)
router.delete('/api/delete/:id',verifyToken,deleteUser)

router.get('/api/user/:id',verifyToken,detailUser)
router.get('/api/getpopularusers',verifyToken,getPopularUser)

router.get('/api/profile/:id',verifyToken,userProfile)

router.put('/api/updateuser/:id',verifyToken,updateUser)
router.put('/api/follow',verifyToken,followingUser)
router.put('/api/unfollow',verifyToken,unFollow)
router.put('/api/block/:id',verifyToken,block)
router.put('/api/unblock/:id',verifyToken,unblock)
router.post('/api/sendmessage',verifyToken,sendEmailMsg)

router.post('/api/create-verifyaccount',verifyToken,CreateVerifyAccountEmail)
router.put('/api/verifyaccount',verifyToken,verifyaccount)

router.post('/api/findfollower',verifyToken,findFollower)

router.post('/api/forgetpassword',forgetPassword)

router.put('/api/verifypassword',verifyForgetPassword)

router.put('/api/editpassword',verifyToken,updatePassword)

router.put('/api/upload-photo-profile',photoUpload.single('image'),profilePhotoResize,verifyToken,uploadProfile)

router.delete('/api/user/logout',verifyToken,logOut)





export default router