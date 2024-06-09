import express from 'express'
import dbConnect from './config/dbconnect.js'
import 'dotenv/config'
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { errorHandler, notFound } from './midleware/error/errorHandler.js'
import catRoute from './routes/catRoute.js'
import postRoute from './routes/postRoute.js'
import commentRoute from './routes/commentRoute.js'

const app=express()
dbConnect()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true, origin:'http://localhost:3000'}))

app.use(userRoute)
app.use(catRoute)
app.use(postRoute)
app.use(commentRoute)


// error handling
app.use(notFound)
app.use(errorHandler)




const PORT=process.env.PORT || 5000

app.listen(PORT,console.log(`server is running on ${PORT}`))