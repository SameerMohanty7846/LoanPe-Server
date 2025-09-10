import express from "express";
import {changePassword, getAllUsers, getUserById, registerUser, updateUserInfo} from '../controllers/user.controller.js'
const userRouter=express.Router()
userRouter.post('/user/register',registerUser)
userRouter.post('/user/register',registerUser)
userRouter.get('/users',getAllUsers)
userRouter.get('/user/:id',getUserById)
userRouter.patch('/user/update/:id',updateUserInfo)
userRouter.get('/user/chage-password',changePassword)




export default userRouter
