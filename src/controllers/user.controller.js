import User from '../models/User.js'
import bcrypt from 'bcrypt'
export const registerUser = async (req, res) => {

    try {
        //retrieving json data
        const { name, email, phone, password, role } = req.body;
        console.log(req.body);

        // empty  validation
        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        //check for existing user
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Email ot Phone already exist"
            })
        }
        //createing salt and hasing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating user

        const created = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || 'user'
        })


        res.status(201).json({
            status: "success",
            message: "user created successfully",
            data: {
                name: created.name,
                email: created.email,
                phone: created.phone,
                role: created.phone
            }
        });
    }
    catch (err) {
        console.log('internal server error', err)
    }
};
export const getAllUsers = async (req, res) => {
    try{
        const users=await User.find({},"-password")//exclude password
        //


        res.status(200).json({
            status:"success",
            message:"data fetched successfully",
            data:users
        })

    }catch(err){
        console.log('internal server error',err)
        res.status(500).json({
            status:"failure",
            message:"error in fetching data"

        })
    }

}
export const getUserById = async (req, res) => {
    try{
        const {id}=req.params
        const user=await User.findById(id).select('-password')
        if(!user){
           return res.status(404).json({
            'message':"User Not Found"
        })
        }

        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({
            'message':"internal server error"
        })
    }

}
export const loginUser = async (req, res) => {

}
//update name email phone 
export const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // First update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true, runValidators: true }
    ).select("-password -__v"); // 👈 exclude password and version key here

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User info updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

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