import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//login user
export const loginUser = async (req, res) => {
    const{email,password}=req.body;
   try{
     if(!email || !password){
       return  res.status(400).json({
            message:"Both email and password required"
        })
    }

    const user=await User.findOne({email})
    if(!user){
      return res.status(401).json({
        message:"Invalid email or password"
      });
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }
    //creating jwt token with user information
    const token=jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    //setting cookie
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"Strict",
        maxAge:24 *60 *60 *1000

    })

    res.status(200).json({
        message:"Login Successful",
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        },
    })



   }catch(err){
      return res.status(500).json({
        "message":"Internal Server Error",
        error:err.message

      })
   }
    




}

//get current user
export const changePassword = async (req, res) => {
    try{
        const{id}=req.params;
        const{oldPassword,newPassword}=req.body;
        if(!oldPassword ||!newPassword){
            return res.status(400).json({
                message:"all fields are required"
            })
        }
        //check weather user exist or not
        const user=await User.findById(id);
        if(!user){
            return res.status(400).json({
                message:"User not present"
            })
        }
        //compare old password
        const isMatch=await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.json(400).json({
                message:"Old Password is incorrect"
            })
        }
        //hash new password
        const hashedPassword=await bcrypt.hash(newPassword,10)
        user.password=hashedPassword;
        await user.save();

        res.status(200).json({
            message:"Password changed successfully"
        })


    }catch(err){
        res.status(500).json({
            message:"internal server error"
        })
    }

}
 
//get current user
export const getCurrentUser=async (req,res)=>{
    try{
        const userId=req.user.id;
        const user=await findById(userId).select('-password');
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        return res.status(200).json({
            user
        })
    }catch(err){
        console.log(`internal server error`)
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
}

//logout user clear cookies
export const logout=async (req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'Strict'
        })

        res.status(200).json({
            message:'Logout Successfull'
        })
        

    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error",
            error:err.message,
        })
    }
}


//http://localhost:7777/loanpe/auth/login
//http://localhost:7777/loanpe/auth/change-password/:id
//http://localhost:7777/loanpe/auth/me
//http://localhost:7777/loanpe/auth/logout
