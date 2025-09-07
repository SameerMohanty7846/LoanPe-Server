import express from "express";
import {getAllUsers, getUserById, registerUser} from '../controllers/user.controller.js'
const userRouter=express.Router()
userRouter.post('/register-user',registerUser)
userRouter.get('/users',getAllUsers)
userRouter.get('/users/:id',getUserById)



export default userRouter
