import express from "express";
import {changePassword, getAllUsers, getUserById, registerUser, updateUserInfo} from '../controllers/user.controller.js'
const userRouter=express.Router()
userRouter.post('/users/register',registerUser)
userRouter.get('/users/allusers',getAllUsers)
userRouter.get('/users/:id',getUserById)
userRouter.patch('/users/update/:id',updateUserInfo)
userRouter.post('/users/chage-password/:id',changePassword)




export default userRouter
