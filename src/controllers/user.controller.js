import User from "../models/User.js";
import bcrypt from 'bcrypt'
export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;
        //empty validation
        if (!name || !phone || !password || !role) {
            return res.status(400).json({
                "message": "All fields are required"
            })
        }

        //check for existing user
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Email or Phone already exist"
            })
        }

        //creating salt and hashing passoword
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating user
        const created = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
            phone,
        })

        res.status(201).json({
            status: "success",
            message: "user created successfully",
            data: {
                name: created.name,
                email: created.email,
                role: created.role,
                phone: created.phone
            }
        })


    }
    catch (err) {
        console.log(`internal server error`, err);
    }



}

export const loginUser = async (req, res) => {

}
export const getUserById = async (req, res) => {

}

export const getAllUsers = async (req, res) => {

}
