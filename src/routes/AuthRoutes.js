import express from "express";
import { changePassword, getCurrentUser, loginUser, logout } from "../controllers/auth.controller.js";
import { authMiddleWare } from "../middlewares/AuthMiddleware.js";
const authRouter=express.Router()

authRouter.post('/auth/login',loginUser)

authRouter.post('/auth/change-password/:id',authMiddleWare,changePassword)
authRouter.get('/auth/me',authMiddleWare,getCurrentUser)
authRouter.post('/auth/logout',authMiddleWare,logout)




export default authRouter
