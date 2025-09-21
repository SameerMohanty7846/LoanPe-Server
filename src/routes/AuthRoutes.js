import express from "express";
import { changePassword, getCurrentUser, loginUser, logout } from "../controllers/auth.controller.js";
const authRouter=express.Router()

authRouter.post('/auth/login',loginUser)

authRouter.post('/auth/change-password/:id',changePassword)
authRouter.get('/auth/me',getCurrentUser)
authRouter.post('/auth/logout',logout)




export default authRouter
