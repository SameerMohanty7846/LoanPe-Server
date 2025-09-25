import express from "express";
import { checkAccountCompletion, getAllUsers, getUserById, registerUser, updateCompleteUser} from '../controllers/user.controller.js'
import { authMiddleWare } from "../middlewares/AuthMiddleware.js";
import upload from "../middlewares/FileUploadMiddleware.js";
const userRouter=express.Router()
userRouter.post('/users/register',registerUser)


userRouter.get('/users/allusers',getAllUsers)
userRouter.get('/users/:id',getUserById)
userRouter.get("/users/check-completion", authMiddleWare, checkAccountCompletion);

// Upload fields: profilePic, idProofFront, idProofBack, incomeProof
userRouter.put(
  "/user/:id",
  authMiddleWare,
  upload({
    mode: "fields",
    field: [
      { name: "profilePic", maxCount: 1 },
      { name: "idProofFront", maxCount: 1 },
      { name: "idProofBack", maxCount: 1 },
      { name: "incomeProof", maxCount: 1 },
    ],
    uploadDir: "public/uploads/users",
    resize: true,
    width: 400,
    height: 400,
  }),
  updateCompleteUser
);



export default userRouter
