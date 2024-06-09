import express from 'express'
import { verifyToken } from '../midleware/token/verifyToken.js'
import { createComment, deleteComment, getAllComment, singleComment, updateComment } from '../controllers/commentController.js';
const router =express.Router()

router.post('/api/cratecomment',verifyToken,createComment)
router.get('/api/getallcomment',verifyToken,getAllComment)
router.get('/api/singlecomment/:id',verifyToken,singleComment)
router.put('/api/updatecomment/:id',verifyToken,updateComment)
router.delete('/api/deletecomment/:id',verifyToken,deleteComment)




export default router;