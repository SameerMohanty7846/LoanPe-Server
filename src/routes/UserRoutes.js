import express from "express";
import { registerUser } from "../controllers/user.controller.js";

const userRoutes=express.Router()
userRoutes.post('/register-user',registerUser)


export default userRoutes