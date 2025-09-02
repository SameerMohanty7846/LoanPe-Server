import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["user", "admin"],  // only allow these values
    default: "user" 
  }
});

const User = mongoose.model("User", UserSchema, "users");

export default User;
