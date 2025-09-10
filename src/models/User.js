import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  }
},
  {
    strict:true,
  }
)
const User=mongoose.model("User",userSchema,"users")
export default User;