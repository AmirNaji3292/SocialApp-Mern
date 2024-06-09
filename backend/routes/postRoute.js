import express from 'express'
import { verifyToken } from '../midleware/token/verifyToken.js'

import { createPost, deletePost, dislikePost, getAllpost, getSinglePosts, PopularPost, togglePostLike, updatePost } from '../controllers/postController.js';
import { photoUpload, postPhotoResize } from '../midleware/upload/uploadphoto.js';

const router=express.Router()


router.post('/api/createpost',photoUpload.single('image'),postPhotoResize,createPost)

router.get('/api/getallpost',verifyToken,getAllpost)

router.get('/api/popularposts',verifyToken,PopularPost)

router.get('/api/getsinglepost/:id',verifyToken,getSinglePosts)
router.put('/api/updatepost/:id',verifyToken,updatePost)
router.delete('/api/deletepost/:id',verifyToken,deletePost)
router.put('/api/likepost',verifyToken,togglePostLike)
router.put('/api/dislikepost',verifyToken,dislikePost)

export default router;