import express from 'express'
import { verifyToken } from '../midleware/token/verifyToken.js'
import { createCat, deleteCat, getAllCat, getSingleCat, updateCat } from '../controllers/CatController.js'

const router=express.Router()


router.post('/api/createcat',verifyToken,createCat)
router.get('/api/getallcat',verifyToken,getAllCat)
router.get('/api/getcat/:id',verifyToken,getSingleCat)
router.put('/api/updatecat/:id',verifyToken,updateCat)
router.delete('/api/deletecat/:id',verifyToken,deleteCat)



export default router